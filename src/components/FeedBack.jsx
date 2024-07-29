import FeedbackCard from "./FeedbackCard";

const testimonials = [
  {
    name: "Jane Doe",
    username: "janed123",
    feedback:
      "I absolutely love the gifts I purchased! They were beautifully wrapped and the quality was top-notch. Highly recommend this shop!",
  },
  {
    name: "John Smith",
    username: "johnsmitty",
    feedback:
      "Great variety of gifts and excellent customer service. My order arrived quickly and exceeded my expectations. Will definitely be shopping here again!",
  },
  {
    name: "Alice Brown",
    username: "aliceb89",
    feedback:
      "Such a delightful shopping experience! The gifts were unique and beautifully crafted. My friends and family loved them. Thank you!",
  },
  {
    name: "Michael Lee",
    username: "michaellee78",
    feedback:
      "Amazing products and fast delivery. The gift wrapping was a lovely touch. I'm very pleased with my purchase and will be coming back for more.",
  },
  {
    name: "Emily White",
    username: "emilyw",
    feedback:
      "Fantastic selection of gifts for all occasions. The customer service team was very helpful in assisting me with my order. Highly satisfied!",
  },
  {
    name: "John Smith",
    username: "johnsmitty",
    feedback:
      "Great variety of gifts and excellent customer service. My order arrived quickly and exceeded my expectations. Will definitely be shopping here again!",
  },
];

const FeedBack = () => {
  return (
    <>
      <section id="users-feedback" className="mt-20 max-w-[900px] mx-auto">
        <div className="bg-white/15 border-rose-300 backdrop-blur-xl mx-auto w-max text-xs py-2 px-4 rounded-full border">
          Feedback
        </div>
        <h4 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl mt-2">
          Public Cheers for Us!
        </h4>
        <p className="text-center text-xs sm:text-base lg:text-normal mt-4">
          Find out how much our users are happy after buying gifts from us!
        </p>

        <div className="feedback-forms mt-16 grid sm:grid-cols-3 gap-6 place-items-center">
          {testimonials.map((item, key) => {
            return (
              <FeedbackCard
                name={item.name}
                username={item.username}
                feedback={item.feedback}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeedBack;
