import React from 'react';
import Image from 'next/image';
import img from '@/public/images/web.svg';
import img2 from '@/public/images/app.svg';
import img3 from '@/public/images/hosting.svg';
import img4 from '@/public/images/consultation.svg';

const Services = () => {
  return (
    <div id="services" className="bg-gray-100 py-12">
      <section data-aos="zoom-in-down">
        <div className="my-4 py-4">
          <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">services</h2>

          <div className="flex justify-center">
            <div className="w-24 border-b-4 border-blue-900"></div>
          </div>
          <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">
            We are deeply committed to the growth and success of our clients.
          </h2>
        </div>

        <div className="px-12" data-aos="fade-down" data-aos-delay="600">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Service Card 1 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <Image alt="General" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img} />
                <h2 className="font-semibold my-4 text-2xl text-center">General</h2>
                <p className="text-md font-medium">
                  We specialize in creating and optimizing high-quality, interior designs for both residential and commercial setups of our clients. Accurate delivery of specific tailored imaes to bring your design ideas to visuals.
                </p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <Image alt="Customize yours" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img2} />
                <h2 className="font-semibold my-4 text-2xl text-center">Custom Models</h2>
                <p className="text-md font-medium">
                  In need of a custom, personalized model to suit your organizations' interior design ideas? Contact Us, our team will deliver on that.
                </p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <Image alt="Just About there" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img3} />
                <h2 className="font-semibold my-4 text-2xl text-center">Coming Soon</h2>
                <p className="text-md font-medium">
                  We provide domain registration and web hosting services to individuals and organizations to enable them to gain visibility in the digital space.
                </p>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
              <div className="m-2 text-justify text-sm">
                <Image alt="Just about there" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={img4} />
                <h2 className="font-semibold my-4 text-2xl text-center">Coming Soon</h2>
                <p className="text-md font-medium">
                  Our IT consultation service provides expert guidance and support for businesses and individuals looking to optimize their technology solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="m-auto max-w-6xl p-2 md:p-12 h-5/6">
          <div className="flex flex-col-reverse lg:flex-row py-8 justify-between lg:text-left" data-aos="zoom-out">
            {/* Left Section */}
            <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
              <div className="text-blue-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className="fill-current">
                  <path d="M2 12h2a7.986 7.986 0 0 1 2.337-5.663 7.91 7.91 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.488 2.488 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059a9.928 9.928 0 0 0-3.18 2.139 9.92 9.92 0 0 0-2.14 3.179A10.005 10.005 0 0 0 2 12zm17.373 3.122c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.965 9.965 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z" />
                  <path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538s4.538-2.036 4.538-4.538S14.502 7.462 12 7.462zm0 7.076c-1.399 0-2.538-1.139-2.538-2.538S10.601 9.462 12 9.462s2.538 1.139 2.538 2.538-1.139 2.538-2.538 2.538z" />
                </svg>
              </div>
              <h3 className="text-3xl text-blue-900 font-bold">
                You <span className="font-black">Request</span>
              </h3>
              <div>
                <p className="my-3 text-xl text-gray-600 font-semibold">
                  Is it your office room? Your living room? All is sorted here at UrbanScript. You want to experience the latest image generation models in action? Login and let us build for you.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-1/2 flex flex-col lg:mx-4 justify-center">
              <div className="text-blue-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" className="fill-current">
                  <path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4z" />
                </svg>
              </div>
              <h3 className="text-3xl text-blue-900 font-bold">
                We <span className="font-black">Deliver</span>
              </h3>
              <div>
                <p className="my-3 text-xl text-gray-600 font-semibold">
                With the rising trend of AI, we keep you up-to-date with custom prototype models of your choice. We provide accurate visuals that help you improve your interior design operations. Save on time and increase productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
