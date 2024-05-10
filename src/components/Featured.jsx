import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <>
      <section id="featured__section" className="my-12">
        <div className="container mx-auto md:px-0 px-4">
          <h1 className="font-extrabold font-Karla my-12 text-3xl">
            Featured Products
          </h1>

          <div className="featured__section__cards flex flex-wrap justify-start gap-12">
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
            <FeaturedCard title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nulla officiis alias!" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Featured;
