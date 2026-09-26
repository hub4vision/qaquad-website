import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Testing Structure & Packages | QA Quad',
  description: 'Explore the comprehensive software testing structure and view our competitive testing packages and pricing.',
};

const testingTree = {
  name: 'Software Testing',
  children: [
    {
      name: 'Functional Testing',
      description: 'Verifies that each function of the software application operates in conformance with the requirement specification.',
      children: [
        { name: 'Unit Testing', description: 'Testing of individual software components.' },
        { name: 'Integration Testing', description: 'Testing of combined parts of an application to determine if they function correctly together.' },
        { name: 'System Testing', description: 'Testing of a complete and fully integrated software product.' },
        { name: 'User Acceptance Testing', description: 'Testing to determine whether a system satisfies the acceptance criteria.' },
      ],
    },
    {
      name: 'Non-Functional Testing',
      description: 'Checks non-functional aspects (performance, usability, reliability, etc.) of a software application.',
      children: [
        { name: 'Performance Testing', description: 'Ensures software applications will perform well under their expected workload.' },
        { name: 'Security Testing', description: 'Uncovers vulnerabilities of the system and determines that its data and resources are protected.' },
        { name: 'Usability Testing', description: 'Evaluates how easy and user-friendly a software application is.' },
        { name: 'Compatibility Testing', description: 'Checks whether your software is capable of running on different hardware, operating systems, and browsers.' },
      ],
    },
    {
      name: 'Automated Testing',
      description: 'Using specialized tools to execute tests and compare actual outcomes with expected results.',
      children: [
        { name: 'API Testing', description: 'Validates application programming interfaces (APIs).' },
        { name: 'Regression Testing', description: 'Re-running functional and non-functional tests to ensure that previously developed and tested software still performs after a change.' },
        { name: 'End-to-End Testing', description: 'Testing a complete application environment in a situation that mimics real-world use.' },
      ],
    }
  ],
};

const pricingPackages = [
  {
    name: 'Starter QA',
    price: '$1,500',
    frequency: 'per month',
    description: 'Perfect for startups and small projects needing essential testing coverage.',
    features: [
      'Manual Functional Testing',
      'Basic UI/UX Testing',
      'Cross-browser Testing (2 browsers)',
      'Weekly Status Reports',
      'Up to 40 hours/month',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro Automation',
    price: '$3,800',
    frequency: 'per month',
    description: 'Comprehensive automation framework setup and continuous testing.',
    features: [
      'Everything in Starter QA',
      'Playwright / Selenium Automation',
      'API & Integration Testing',
      'CI/CD Pipeline Integration',
      'Regression Test Suites',
      'Up to 100 hours/month',
    ],
    buttonText: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Enterprise Scaling',
    price: '$7,500+',
    frequency: 'per month',
    description: 'Full-scale testing division with dedicated AI-powered QA engineering.',
    features: [
      'Everything in Pro Automation',
      'Performance & Load Testing',
      'Security Vulnerability Scans',
      'AI QA Agent Integrations',
      'Dedicated QA Lead & Team',
      'Custom SLA & 24/7 Support',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

export default function TestingStructurePage() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-300 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Testing Structure</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-slate-400">
            A methodical approach to ensuring software quality across all dimensions of your product.
          </p>
        </div>

        {/* Tree Structure Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Software Testing Hierarchy</h2>
          
          <div className="pl-2 md:pl-6 overflow-x-auto pb-4">
            {/* Root Node */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 animate-pulse"></div>
              <span className="text-2xl font-bold text-blue-100">{testingTree.name}</span>
            </div>

            {/* Level 1 Nodes */}
            <div className="relative pl-6 md:pl-10 space-y-12">
              {/* Vertical line connecting children to root */}
              <div className="absolute left-[7px] md:left-[23px] top-0 bottom-10 w-[2px] bg-slate-700"></div>
              
              {testingTree.children.map((child, index) => (
                <div key={index} className="relative">
                  {/* Horizontal line to this node */}
                  <div className="absolute -left-6 md:-left-10 top-5 w-6 md:w-10 h-[2px] bg-slate-700"></div>
                  
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 hover:border-indigo-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-indigo-300 mb-2">{child.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{child.description}</p>
                    
                    {/* Level 2 Nodes */}
                    <div className="relative pl-6 space-y-4 mt-4">
                      {/* Vertical line for sub-children */}
                      <div className="absolute left-2 top-0 bottom-4 w-[2px] bg-slate-700/50"></div>
                      
                      {child.children.map((subChild, subIndex) => (
                        <div key={subIndex} className="relative flex items-start group">
                          {/* Horizontal line to sub-child */}
                          <div className="absolute -left-4 top-3 w-4 h-[2px] bg-slate-700/50 group-hover:bg-indigo-500/50 transition-colors"></div>
                          
                          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex-1 group-hover:border-indigo-500/30 transition-all">
                            <span className="font-medium text-slate-200 block">{subChild.name}</span>
                            <span className="text-xs text-slate-500">{subChild.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-12 pt-10 border-t border-slate-800/50">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Current Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Pricing Packages</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Transparent, competitive rates for top-tier QA engineering and automation services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {pricingPackages.map((pkg, i) => (
              <div 
                key={i} 
                className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 ${
                  pkg.popular 
                    ? 'bg-slate-800/80 border-indigo-500 md:-translate-y-4 shadow-xl shadow-indigo-900/20 z-10' 
                    : 'bg-slate-900/60 border-slate-700/50'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 text-center w-full">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-extrabold text-white">{pkg.price}</span>
                    <span className="text-slate-400">{pkg.frequency}</span>
                  </div>
                  <p className="text-slate-400 text-sm h-12 mb-6">
                    {pkg.description}
                  </p>
                  
                  <button className={`w-full py-3 px-4 rounded-xl font-medium transition-colors mb-8 ${
                    pkg.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20' 
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}>
                    {pkg.buttonText}
                  </button>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider">What's included:</p>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
