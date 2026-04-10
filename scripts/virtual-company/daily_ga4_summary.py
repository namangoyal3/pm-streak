#!/usr/bin/env python3
"""
Daily GA4 Summary System
Automatically analyzes GA4 data and provides actionable insights
"""

import os
import sys
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional

# Add the current directory to python path
sys.path.append(os.path.dirname(__file__))

def fetch_ga4_data(property_id: str = "529697573", days_back: int = 7) -> Dict[str, Any]:
    """Fetch comprehensive GA4 data for analysis"""
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange, Dimension, Metric, RunReportRequest,
    )
    
    creds_path = os.path.join(os.path.dirname(__file__), "service_account.json")
    if not os.path.exists(creds_path):
        raise FileNotFoundError(f"service_account.json not found at {creds_path}")
    
    try:
        with open(creds_path) as f:
            info = json.load(f)
        
        client = BetaAnalyticsDataClient.from_service_account_info(info)
        
        # Fetch multiple metrics for comprehensive analysis
        metrics_to_fetch = [
            "activeUsers",
            "newUsers", 
            "sessions",
            "screenPageViews",
            "averageSessionDuration",
            "bounceRate",
            "conversions",
            "totalRevenue"
        ]
        
        dimensions_to_fetch = [
            "pagePath",
            "deviceCategory",
            "country",
            "sessionSource"
        ]
        
        # Create metrics list
        metrics = [Metric(name=metric) for metric in metrics_to_fetch]
        
        # Create dimensions list  
        dimensions = [Dimension(name=dimension) for dimension in dimensions_to_fetch]
        
        request = RunReportRequest(
            property=f"properties/{property_id}",
            dimensions=dimensions,
            metrics=metrics,
            date_ranges=[DateRange(start_date=f"{days_back}daysAgo", end_date="today")],
            limit=1000
        )
        
        response = client.run_report(request)
        
        # Process the data
        data = {
            "property_id": property_id,
            "date_range": f"Last {days_back} days",
            "total_rows": len(response.rows),
            "dimension_headers": [dh.name for dh in response.dimension_headers],
            "metric_headers": [mh.name for mh in response.metric_headers],
            "rows": []
        }
        
        for row in response.rows:
            row_data = {
                "dimensions": [dv.value for dv in row.dimension_values],
                "metrics": [float(mv.value) if mv.value else 0.0 for mv in row.metric_values]
            }
            data["rows"].append(row_data)
        
        return data
        
    except Exception as e:
        raise Exception(f"GA4 API Error: {e}")

def analyze_ga4_data(ga4_data: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze GA4 data to identify trends, issues, and opportunities"""
    
    if not ga4_data.get("rows"):
        return {"error": "No data available for analysis"}
    
    analysis = {
        "summary_date": datetime.now().strftime("%Y-%m-%d"),
        "overview": {},
        "top_performers": [],
        "issues": [],
        "opportunities": [],
        "recommendations": []
    }
    
    # Calculate totals
    total_users = 0
    total_sessions = 0
    total_conversions = 0
    total_revenue = 0
    
    for row in ga4_data["rows"]:
        metrics = row["metrics"]
        # Assuming order: activeUsers, newUsers, sessions, screenPageViews, 
        # averageSessionDuration, bounceRate, conversions, totalRevenue
        if len(metrics) >= 8:
            total_users += metrics[0]  # activeUsers
            total_sessions += metrics[2]  # sessions
            total_conversions += metrics[6]  # conversions
            total_revenue += metrics[7]  # totalRevenue
    
    analysis["overview"] = {
        "total_users": total_users,
        "total_sessions": total_sessions,
        "total_conversions": total_conversions,
        "total_revenue": total_revenue,
        "conversion_rate": (total_conversions / total_sessions * 100) if total_sessions > 0 else 0,
        "revenue_per_user": (total_revenue / total_users) if total_users > 0 else 0
    }
    
    # Identify top performing pages
    page_performance = {}
    for row in ga4_data["rows"]:
        dimensions = row["dimensions"]
        metrics = row["metrics"]
        
        if len(dimensions) > 0 and dimensions[0]:  # pagePath
            page_path = dimensions[0]
            if page_path not in page_performance:
                page_performance[page_path] = {
                    "users": 0,
                    "sessions": 0,
                    "conversions": 0,
                    "revenue": 0
                }
            
            if len(metrics) >= 8:
                page_performance[page_path]["users"] += metrics[0]
                page_performance[page_path]["sessions"] += metrics[2]
                page_performance[page_path]["conversions"] += metrics[6]
                page_performance[page_path]["revenue"] += metrics[7]
    
    # Sort pages by conversions
    sorted_pages = sorted(
        page_performance.items(),
        key=lambda x: x[1]["conversions"],
        reverse=True
    )[:10]
    
    for page_path, stats in sorted_pages:
        conversion_rate = (stats["conversions"] / stats["sessions"] * 100) if stats["sessions"] > 0 else 0
        analysis["top_performers"].append({
            "page": page_path,
            "users": stats["users"],
            "sessions": stats["sessions"],
            "conversions": stats["conversions"],
            "revenue": stats["revenue"],
            "conversion_rate": conversion_rate
        })
    
    # Identify issues (high bounce rate, low conversion)
    for row in ga4_data["rows"]:
        dimensions = row["dimensions"]
        metrics = row["metrics"]
        
        if len(metrics) >= 6:  # Need bounceRate at index 5
            bounce_rate = metrics[5]
            sessions = metrics[2] if len(metrics) > 2 else 0
            
            if bounce_rate > 70 and sessions > 100:  # High bounce rate with significant traffic
                page_path = dimensions[0] if dimensions else "Unknown"
                analysis["issues"].append({
                    "type": "high_bounce_rate",
                    "page": page_path,
                    "bounce_rate": bounce_rate,
                    "sessions": sessions,
                    "recommendation": "Improve page content, load speed, or user experience"
                })
    
    # Identify opportunities (high traffic, low conversion)
    for page, stats in page_performance.items():
        if stats["sessions"] > 500 and stats["conversions"] == 0:
            analysis["opportunities"].append({
                "type": "high_traffic_no_conversion",
                "page": page,
                "sessions": stats["sessions"],
                "conversions": stats["conversions"],
                "recommendation": "Add clear CTAs, improve value proposition, or test different offers"
            })
    
    # Generate recommendations
    if analysis["overview"]["conversion_rate"] < 2:
        analysis["recommendations"].append({
            "priority": "high",
            "action": "Improve overall conversion rate",
            "suggestion": "Implement A/B testing on key landing pages, optimize CTAs, and improve user onboarding"
        })
    
    if len(analysis["issues"]) > 3:
        analysis["recommendations"].append({
            "priority": "high",
            "action": "Address high bounce rates",
            "suggestion": "Review and optimize the top 3 high-bounce pages for better engagement"
        })
    
    if analysis["overview"]["revenue_per_user"] < 10:
        analysis["recommendations"].append({
            "priority": "medium",
            "action": "Increase average revenue per user",
            "suggestion": "Consider upselling strategies, bundle offers, or introduce premium features"
        })
    
    return analysis

def generate_summary_report(analysis: Dict[str, Any]) -> str:
    """Generate a human-readable summary report"""
    
    report = f"📊 **DAILY GA4 SUMMARY REPORT**\n"
    report += f"Date: {analysis['summary_date']}\n"
    report += "=" * 50 + "\n\n"
    
    # Overview
    overview = analysis["overview"]
    report += f"**📈 OVERVIEW**\n"
    report += f"• Total Users: {overview['total_users']:,.0f}\n"
    report += f"• Total Sessions: {overview['total_sessions']:,.0f}\n"
    report += f"• Total Conversions: {overview['total_conversions']:,.0f}\n"
    report += f"• Total Revenue: ${overview['total_revenue']:,.2f}\n"
    report += f"• Conversion Rate: {overview['conversion_rate']:.2f}%\n"
    report += f"• Revenue/User: ${overview['revenue_per_user']:.2f}\n\n"
    
    # Top Performers
    if analysis["top_performers"]:
        report += f"**🏆 TOP PERFORMING PAGES**\n"
        for i, page in enumerate(analysis["top_performers"][:5], 1):
            report += f"{i}. {page['page'][:50]}...\n"
            report += f"   👥 {page['users']:,.0f} users | 🎯 {page['conversions']:,.0f} conv ({page['conversion_rate']:.1f}%)\n"
        report += "\n"
    
    # Issues
    if analysis["issues"]:
        report += f"**⚠️ CRITICAL ISSUES**\n"
        for issue in analysis["issues"][:3]:
            report += f"• {issue['page'][:40]}...\n"
            report += f"  Bounce Rate: {issue['bounce_rate']:.1f}% ({issue['sessions']:,.0f} sessions)\n"
            report += f"  💡 {issue['recommendation']}\n"
        report += "\n"
    
    # Opportunities
    if analysis["opportunities"]:
        report += f"**🚀 GROWTH OPPORTUNITIES**\n"
        for opp in analysis["opportunities"][:3]:
            report += f"• {opp['page'][:40]}...\n"
            report += f"  {opp['sessions']:,.0f} sessions but 0 conversions\n"
            report += f"  💡 {opp['recommendation']}\n"
        report += "\n"
    
    # Recommendations
    if analysis["recommendations"]:
        report += f"**🎯 ACTIONABLE RECOMMENDATIONS**\n"
        for rec in analysis["recommendations"]:
            priority_emoji = "🔴" if rec["priority"] == "high" else "🟡" if rec["priority"] == "medium" else "🟢"
            report += f"{priority_emoji} **{rec['action']}**\n"
            report += f"   {rec['suggestion']}\n"
        report += "\n"
    
    report += "=" * 50 + "\n"
    report += "Generated by Virtual C-Suite CDO Agent 🤖\n"
    
    return report

def main():
    """Main function to run daily GA4 analysis"""
    print("🚀 Starting Daily GA4 Analysis...")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # Step 1: Fetch GA4 data
        print("📊 Fetching GA4 data...")
        ga4_data = fetch_ga4_data(days_back=1)  # Get yesterday's data
        
        # Step 2: Analyze the data
        print("🔍 Analyzing trends and patterns...")
        analysis = analyze_ga4_data(ga4_data)
        
        # Step 3: Generate report
        print("📝 Generating summary report...")
        report = generate_summary_report(analysis)
        
        # Step 4: Output the report
        print("\n" + "="*60)
        print(report)
        print("="*60)
        
        # Step 5: Save report to file
        report_dir = os.path.join(os.path.dirname(__file__), "reports")
        os.makedirs(report_dir, exist_ok=True)
        
        report_file = os.path.join(report_dir, f"ga4_summary_{datetime.now().strftime('%Y%m%d')}.md")
        with open(report_file, "w") as f:
            f.write(report)
        
        print(f"✅ Report saved to: {report_file}")
        
        return report
        
    except Exception as e:
        error_msg = f"❌ Error in daily GA4 analysis: {str(e)}"
        print(error_msg)
        return error_msg

if __name__ == "__main__":
    main()