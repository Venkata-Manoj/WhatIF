
import { ComponentInputForm } from '@/components/what-if/component-input-form';
import { WelcomeScreen } from '@/components/what-if/welcome-screen';
import { Hero } from '@/components/what-if/hero';

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
       <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        <ComponentInputForm />
      </main>
      <WelcomeScreen />
    </div>
  );
}
