import { Upload, Settings, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload your file',
    description: 'Drag & drop or browse to select your Word or PDF file.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'We convert it',
    description: 'Our server processes your file in seconds with high fidelity.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download the result',
    description: 'Your converted file is ready. Download it instantly.',
  },
];

function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-10">
          How it works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="text-center relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-px bg-gray-200" />
              )}

              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-brand-50 rounded-2xl mb-4">
                <step.icon className="w-7 h-7 text-brand-600" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
