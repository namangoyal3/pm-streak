import os
import sys

# Add the current directory to python path
sys.path.append(os.path.dirname(__file__))

from crew import execute_company_mission

def main():
    print("🚀 Virtual Enterprise Swarm - Initializing Board Meeting...")
    
    directive = os.getenv("BOARD_DIRECTIVE")
    if not directive:
        directive = "Review our recent metrics and deploy a new A/B test to improve Pro conversion rates."
        
    ga4_property_id = os.getenv("GA4_PROPERTY_ID", "529697573")
    
    print(f"📋 Directive: {directive}")
    print("--------------------------------------------------")
    
    result = execute_company_mission(directive, ga4_property_id)
    
    print("\n\n✅ Board Meeting Concluded. Final Decision & Actions:")
    print("==================================================")
    print(result)

if __name__ == "__main__":
    main()
