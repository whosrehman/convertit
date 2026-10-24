import { Lock, Zap, Infinity, Monitor } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Private',
    description: 'Files auto-delete in 1 hour. Encrypted in transit.',
  },
  {
    icon: Zap,
    title: 'Instant',
    description: 'Most files convert in under 5 seconds.',
  },
  {
    icon: Infinity,
    title: 'Unlimited',
    description: 'No daily limits. Convert as many files as you need.',
  },
  {
    icon: Monitor,
    title: 'Any device',
    description: 'Works on phone, tablet, and desktop browsers.',
  },
];

function Features() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-10">
          Why Convert<span className="text-brand-600">It</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
