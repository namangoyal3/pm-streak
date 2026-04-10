#!/usr/bin/env python3
"""
Daily Summary Runner - Simplified interface for OpenClaw integration
"""

import os
import sys
from datetime import datetime

# Add the current directory to python path
sys.path.append(os.path.dirname(__file__))

from daily_ga4_summary import main as run_ga4_summary

def main():
    """Run daily summary and return formatted output for OpenClaw"""
    print("🦞 OpenClaw Daily GA4 Summary System")
    print("=" * 50)
    
    try:
        # Run the GA4 summary
        result = run_ga4_summary()
        
        # Return clean output for OpenClaw
        if isinstance(result, str) and result.startswith("❌"):
            # Error case
            return {
                "success": False,
                "message": result,
                "timestamp": datetime.now().isoformat()
            }
        else:
            # Success case
            return {
                "success": True,
                "report": result,
                "timestamp": datetime.now().isoformat(),
                "message": "Daily GA4 summary generated successfully"
            }
            
    except Exception as e:
        return {
            "success": False,
            "message": f"Unexpected error: {str(e)}",
            "timestamp": datetime.now().isoformat()
        }

if __name__ == "__main__":
    result = main()
    
    # Print result for command line
    if isinstance(result, dict):
        if result.get("success"):
            print("\n✅ SUCCESS")
            print(result.get("message", ""))
            if "report" in result:
                print("\n" + "="*50)
                print(result["report"])
        else:
            print(f"\n❌ FAILED: {result.get('message', 'Unknown error')}")
    else:
        print(result)