import Hero from './Hero';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <Hero />
    </section>
  );
};

export default HomePage;
