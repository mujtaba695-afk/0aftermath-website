from fpdf import FPDF
import textwrap

class RoadmapPDF(FPDF):
    def header(self):
        # Logo or Brand Name
        self.set_font('Helvetica', 'B', 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, '0aftermath | 2026 Digital Marketing Roadmap', align='R', new_x="LMARGIN", new_y="NEXT")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def chapter_title(self, title):
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(0, 0, 0) # Black
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT", align='L')
        self.ln(5)
        # Underscore
        self.set_draw_color(99, 102, 241) # Primary Blue/Purple
        self.set_line_width(1)
        self.line(self.get_x(), self.get_y(), self.get_x() + 190, self.get_y())
        self.ln(10)

    def chapter_body(self, body):
        self.set_font('Helvetica', '', 11)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 6, body)
        self.ln()

    def section_title(self, title):
        self.set_font('Helvetica', 'B', 13)
        self.set_text_color(30, 30, 30)
        self.ln(5)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT", align='L')
        self.ln(1)

def create_pdf():
    pdf = RoadmapPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Title Page
    pdf.add_page()
    pdf.set_font('Helvetica', 'B', 24)
    pdf.ln(60)
    pdf.cell(0, 15, '2026 Digital Marketing Road Map:', align='C', new_x="LMARGIN", new_y="NEXT")
    pdf.set_font('Helvetica', 'B', 20)
    pdf.set_text_color(99, 102, 241) # Brand accent
    pdf.cell(0, 15, 'The Intelligence-First Era', align='C', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)
    pdf.set_font('Helvetica', 'I', 14)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 10, 'Moving Beyond Automation to Autonomous Growth', align='C', new_x="LMARGIN", new_y="NEXT")
    
    # Content
    chapters = [
        {
            "title": "Chapter 1: Performance Marketing – The Predictive Profit Engine",
            "body": """In 2026, performance marketing has transcended its roots in simple ad buying. It is now a fully integrated, data-centric discipline where success is determined by the sophistication of your machine learning models. The goal is no longer to manage campaigns, but to train AI algorithms to autonomously acquire your highest-value customers at the lowest possible marginal cost.""",
            "sections": [
                ("1.1 Predictive Bidding & Lifetime Value (LTV) Optimization", """The era of optimizing for clicks, impressions, or even first conversions is over. Modern platforms (Google, Meta, TikTok) operate as "black box" AI systems. Your job is to feed them the highest-quality signal possible.

LTV as the Primary Signal: You must integrate your Customer Relationship Management (CRM) and purchase history data with ad platforms via enhanced conversions and clean, raw data ingestion. This trains the AI to find users who don't just convert once, but who exhibit traits of high repeat purchase rates and low churn.

Algorithmic Bid Strategies: Moving beyond "Target CPA" to "Target ROAS" (Return on Ad Spend) modeled on a 90-day+ window. For sophisticated setups, Portfolio Bid Strategies are used to manage budget fluidly across platforms based on real-time blended performance."""),
                ("1.2 Holistic Cross-Channel Attribution", """Understanding revenue sources in a privacy-first, cookieless world requires a fundamental shift from last-click attribution to algorithmic measurement.

Media Mix Modeling (MMM): Returning to aggregate statistical analysis to understand the baseline impact of brand campaigns, offline channels, and macro-economic factors on revenue.

Incrementality Testing: Regularly conducting controlled experiments (geo-holds or time-holds) to answer the critical question: "If we turned this channel off, how much revenue would we actually lose?" This validates the AI's reported performance.

Unified Measurement Framework: Combining the directional insights of MMM with the granular, user-level data from first-party sources and platform APIs to create a single source of truth."""),
                ("1.3 Dynamic Creative Optimization (DCO) at Scale", """Creative is the final frontier of optimization. In 2026, creative testing is a programmatic, always-on process.

AI-Powered Creative Analysis: Using computer vision and natural language processing to analyze winning ad components (colors, faces, text overlays, pacing) and generate briefs for human creators.

Modular Creative Production: Producing ad assets in a "Lego-block" format—multiple hooks, bodies, and endings that can be dynamically assembled by ad servers to personalize the ad to the viewer in real-time.

KPI Focus: Shifting success metrics from Cost Per Mille (CPM) and Cost Per Click (CPC) to Cost Per Acquired Customer (CPA) and, more importantly, Customer Acquisition Cost (CAC) payback period.""")
            ]
        },
        {
            "title": "Chapter 2: Social Media Mastery – Building Verifiable Trust at Scale",
            "body": """As AI-generated content floods the internet, the scarcity of genuine human connection becomes the ultimate competitive advantage. Attention is the currency, but trust is the vault that holds its value. Your social strategy must pivot from broadcasting messages to cultivating communities and leveraging authentic voices.""",
            "sections": [
                ("2.1 The Trust Algorithm: Community & User-Generated Content (UGC)", """Consumers are now trained to ignore polished, brand-generated content. They seek validation from peers.

Strategic UGC Funnels: Actively building systems to generate a constant stream of customer content. This includes running challenges, creating branded hashtags, engaging micro-influencers as "brand ambassadors," and legally sourcing and repurposing customer unboxing and testimonial videos.

Community-Led Growth: Shifting focus from vanity metrics (likes, followers) to engagement depth. Building private communities (Discord, Slack, or WhatsApp channels) where your most loyal customers can interact, provide feedback, and become evangelists. This creates a "feedback loop" that informs product development and marketing.

Narrative Transportation: Crafting stories that users can see themselves in. Moving beyond feature lists to tell stories of transformation, struggle, and success that resonate on an emotional level."""),
                ("2.2 Platform Mastery & Algorithmic Alignment", """Each platform is a distinct search and discovery engine with its own unique user intent. A blanket strategy fails.

TikTok & Instagram Reels (The Discovery Engines): Strategy here is based on trends, sounds, and educational entertainment ("Edutainment"). Content must hook within the first 1-2 seconds and prioritize high "retention" and "watch time to completion." The goal is to land on the "For You" page.

YouTube (The Search & Authority Engine): Investing in long-form content that answers specific user questions. YouTube is the world's second-largest search engine; SEO for YouTube (thumbnail, title, description optimization) is critical for capturing high-intent, "how-to" traffic.

LinkedIn (The Professional Trust Engine): Focus is on thought leadership and building authority. Executives and subject matter experts build personal brands that humanize the corporation and generate high-quality B2B leads through insightful commentary and industry analysis.

KPI Focus: Engagement Rate (shares, saves, comments), Share of Voice (SOV) against competitors, and Community Growth Rate (quality of new members over quantity).""")
            ]
        },
        {
            "title": "Chapter 3: The Conversion Hub – Engineering High-Performance Websites",
            "body": """Your website is no longer just a digital brochure; it is the central nervous system of your revenue operations. It must be a frictionless, fast, and psychologically persuasive engine designed to convert traffic from any source into tangible business outcomes.""",
            "sections": [
                ("3.1 Frictionless UX/UI: The Speed-Trust Nexus", """User experience is the new SEO. Google's Core Web Vitals are a baseline, not a differentiator. True performance is about minimizing cognitive load.

Mobile-First Architecture: Designing for mobile first (not just responsively). This means thumb-friendly navigation, tappable CTAs, and streamlined forms. We assume 80-90% of traffic is mobile and build the desktop experience as an enhancement.

Core Web Vitals Mastery: Achieving consistent "Good" scores in Largest Contentful Paint (LCP < 2.5s), Interaction to Next Paint (INP < 200ms), and Cumulative Layout Shift (CLS < 0.1). This involves advanced image optimization, code splitting, and server-side rendering.

Psychological Persuasion: Implementing design elements that build trust and guide action. This includes:

Social Proof Proximity: Placing reviews and testimonials next to CTAs.

Scarcity & Urgency: Using low-stock indicators and time-limited offers (ethically) to reduce hesitation.

Anchoring: Displaying higher-priced options next to the target offer to make it seem like a better value."""),
                ("3.2 The Micro-Conversion Ecosystem", """Not every visitor is ready to buy. A high-performance site captures value at every stage of the journey.

Intent-Based CTAs: Using exit-intent popups to offer lead magnets (discounts, guides, consultations). Using scroll-triggered sticky headers with a simplified "Contact Us" or "Add to Cart" button.

Conversational Interfaces: Replacing static FAQ pages with dynamic, searchable knowledge bases and AI-powered chatbots that can answer nuanced questions without human intervention.

Progressive Profiling: Using multi-step forms that ask for one piece of information at a time, reducing form abandonment and gradually building a rich user profile over multiple visits.

KPI Focus: Bounce Rate (by traffic source), Conversion Rate (overall and by segment), Average Session Duration, and Form Field Abandonment Rate.""")
            ]
        },
        {
            "title": "Chapter 4: AI & Automation – The Hyper-Personalization Engine",
            "body": """Automation in 2026 is not a tool for reducing headcount, but a capability for delivering one-to-one personalization at a scale previously unimaginable. It's about creating an intelligent infrastructure that learns, predicts, and acts on behalf of the marketer, 24/7.""",
            "sections": [
                ("4.1 Intelligent Sales Pipelines & Orchestration", """Marketing automation has evolved into "Revenue Orchestration." It's no longer just email blasts; it's a coordinated, multi-channel dialogue driven by real-time user behavior.

AI Agent Deployment: Implementing specialized AI agents that handle distinct tasks:

Qualification Agents: Chat or email bots that ask BANT (Budget, Authority, Need, Time) questions and seamlessly hand off hot leads to human sales reps with full context.

Nurturing Agents: Automated sequences (email, SMS, push) triggered by specific behaviors like "visited pricing page but didn't convert." These sequences adapt content based on the user's industry or past interactions.

Support Agents: Advanced chatbots integrated with your knowledge base and order management system to resolve 80% of common queries instantly."""),
                ("4.2 Predictive Analytics & Forecasting", """Using historical and real-time data to anticipate future outcomes.

Lead Scoring 2.0: Moving beyond simple demographic scoring. Predictive lead scoring models analyze thousands of data points (firmographics, website behavior, email engagement, social interactions) to assign a probability score for conversion.

Churn Prediction: Identifying customers who are showing early warning signs of disengagement (e.g., decreased login frequency, negative support interactions) and triggering automated "save" campaigns with special offers or check-in calls.

Sales Forecasting: Feeding pipeline data, historical trends, and seasonality into machine learning models to generate highly accurate revenue forecasts, allowing for proactive budget and inventory adjustments."""),
                ("4.3 Hyper-Personalized Content Experiences", """Automation allows us to dynamically tailor the website and marketing content to the individual user.

Dynamic Website Content: Changing hero images, headlines, and case studies on the website based on the visitor's referral source, industry, or past interaction history.

Behavioral Email Triggers: Sending a personalized email not just 24 hours after a cart abandon, but 5 minutes after a user spends 30 seconds on a specific product page, offering a demo or a detailed guide related to that specific product.

KPI Focus: Lead Response Time (goal is near-zero), Email/SMS Open & Click Rates, Form-to-Meeting Conversion Rate, and Automated Pipeline Revenue.""")
            ]
        },
        {
            "title": "Chapter 5: The 90-Day Action Plan – From Audit to Domination",
            "body": """This is a phased, aggressive sprint to transform your digital marketing operations from a basic setup to an intelligence-first growth engine.""",
            "sections": [
                ("[Phase 1: Days 1-30] The Foundation & Intelligence Audit", """Objective: Establish the data infrastructure and creative baseline. No scaling occurs on a broken foundation.

Key Actions:

Tech Stack Audit: Review current CRM, analytics (GA4 setup), and ad pixel implementations. Ensure first-party data tracking (enhanced conversions, CRM integration) is pristine.

Creative Audit: Analyze top 20 performing ads and organic posts of the last 6 months. Identify patterns (hooks, visuals, offers) that worked.

Website Technical Audit: Run full Lighthouse and Core Web Vitals report. Create a backlog of fixes for mobile speed and UX friction points.

Asset Creation: Develop a library of modular creative assets (video hooks, images, copy frameworks) based on the audit findings."""),
                ("[Phase 2: Days 31-60] Activation & Systematic Testing", """Objective: Launch initial campaigns, implement automation, and begin rigorous testing to feed the AI.

Key Actions:

Campaign Launch: Deploy initial ad campaigns, ensuring predictive bidding is fed with LTV conversion data.

AI Implementation: Build and launch the first AI chatbot agent. Configure 3-5 key behavioral email/SMS automation workflows (e.g., welcome series, abandoned cart, high-intent follow-up).

A/B Testing Sprint: Launch a structured testing plan for website (e.g., headline test, CTA color/placement) and ads (e.g., hook variations, offer tests). Aim for statistical significance.

Social UGC Campaign: Launch a mini-campaign to solicit UGC from existing customers (e.g., a photo contest or testimonial request)."""),
                ("[Phase 3: Days 61-90] Optimization & Aggressive Scaling", """Objective: Analyze test results, double down on winners, and expand reach systematically.

Key Actions:

Scale Winning Audiences: Based on first 30 days of data, increase budgets on the highest-LTV audience segments and ad creatives.

Retargeting Mastery: Build sophisticated retargeting funnels that show different ads based on which product pages a user viewed or how far they got in the funnel.

Analytics Review & Forecasting: Conduct a deep-dive on attribution data. Use predictive analytics to forecast Q3/Q4 trends and adjust the strategy accordingly.

Market Domination Play: Launch an aggressive "conquesting" campaign targeting competitors' audiences or keywords, using the high-performing creative assets validated in Phase 2.""")
            ]
        }
    ]

    for chapter in chapters:
        # Sanitize text for Latin-1
        chapter["title"] = chapter["title"].replace('–', '-').replace('—', '-').replace('’', "'").replace('“', '"').replace('”', '"')
        chapter["body"] = chapter["body"].replace('–', '-').replace('—', '-').replace('’', "'").replace('“', '"').replace('”', '"')
        
        pdf.add_page()
        pdf.chapter_title(chapter["title"])
        pdf.chapter_body(chapter["body"])
        for section_title, section_body in chapter["sections"]:
            section_title = section_title.replace('–', '-').replace('—', '-').replace('’', "'").replace('“', '"').replace('”', '"')
            section_body = section_body.replace('–', '-').replace('—', '-').replace('’', "'").replace('“', '"').replace('”', '"')
            pdf.section_title(section_title)
            pdf.chapter_body(section_body)

    # Call to Action Page
    pdf.add_page()
    pdf.ln(50)
    pdf.set_font('Helvetica', 'B', 18)
    pdf.cell(0, 10, 'Ready to activate your 90-day roadmap?', align='C', new_x="LMARGIN", new_y="NEXT")
    pdf.ln(5)
    
    pdf.set_font('Helvetica', '', 12)
    pdf.multi_cell(0, 8, "Don't let another quarter pass with a generic strategy. Our specialists will audit your current digital footprint and build a custom, intelligence-first plan to dominate your market in 2026.".replace('’', "'"), align='C')
    pdf.ln(10)
    
    # "Button" simulation
    pdf.set_fill_color(99, 102, 241) # Blue/Purple
    pdf.set_text_color(255, 255, 255) # White
    pdf.set_font('Helvetica', 'B', 14)
    # Center the cell
    pdf.cell(0, 15, 'Book My Free Strategy Call', align='C', fill=True, link='https://0aftermath.com/#contact')

    pdf.output('roadmap_2026.pdf')

if __name__ == '__main__':
    create_pdf()
