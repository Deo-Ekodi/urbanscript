// 'use client';
// import React from 'react';
// import styled from 'styled-components';
// import { useSession } from 'next-auth/react'; // Import useSession from next-auth

// // Styled Components
// const PageContainer = styled.div`
//   text-align: center;
//   background: linear-gradient(135deg, #f4f4f4, #ffffff);
//   padding: 20px;
//   font-family: Arial, sans-serif;
//   background-image: url('/path-to-your-doodle-image.png'); /* Replace with your doodle image */
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
// `;

// const HeroSection = styled.section`
//   padding: 40px;
//   background-color: #fafafa;
//   border-bottom: 1px solid #ddd;
// `;

// const Heading = styled.h1`
//   font-size: 3em;
//   margin-bottom: 10px;
//   color: #333;
// `;

// const Subheading = styled.p`
//   font-size: 1.2em;
//   margin-bottom: 20px;
//   color: #666;
// `;

// const PackagesSection = styled.section`
//   display: flex;
//   justify-content: center;
//   margin: 50px 0;
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const PackageCard = styled.div`
//   background: ${(props) => props.$bgColor || '#fff'};
//   color: ${(props) => props.$textColor || '#000'};
//   border-radius: 10px;
//   padding: 30px;
//   width: 300px;
//   margin: 0 20px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
//   }

//   @media (max-width: 768px) {
//     margin: 20px 0;
//   }
// `;

// const PackageTitle = styled.h2`
//   font-size: 2em;
//   margin-bottom: 20px;
// `;

// const PackagePrice = styled.p`
//   font-size: 1.8em;
//   margin: 10px 0;
// `;

// const PackageFeatures = styled.ul`
//   list-style-type: none;
//   padding: 0;
//   font-size: 1.1em;
//   margin-bottom: 20px;
// `;

// const FeatureItem = styled.li`
//   margin: 10px 0;
//   color: ${(props) => props.$featureColor || '#000'};
// `;

// const ChooseButton = styled.button`
//   padding: 10px 20px;
//   background-color: ${(props) => props.$bgColor || '#333'};
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   font-size: 1em;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: ${(props) => props.$hoverColor || '#555'};
//   }
// `;

// // Main Component for Pricing Page
// const PricingPage = () => {
//   const { data: session } = useSession(); // Move useSession to top-level

//   const handlePayment = (amount) => {
//     if (!session) {
//       alert('Please log in to make a purchase.'); // Check for session
//       return;
//     }

//     const handler = PaystackPop.setup({
//       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Replace with your Paystack public key
//       email: session.user.email, // Use the email from session
//       amount: amount * 100, // Amount in kobo
//       currency: 'NGN', // Currency
//       callback: function (response) {
//         // This will be called when the payment is successful
//         alert('Payment successful! Reference: ' + response.reference);
//       },
//       onClose: function () {
//         alert('Transaction was not completed, window closed.');
//       },
//     });
//     handler.openIframe(); // Opens the payment modal
//   };

//   return (
//     <PageContainer>
//       <HeroSection>
//         <Heading>Choose the Perfect Plan for Your Design Needs</Heading>
//         <Subheading>
//           Unlock the power of AI to generate stunning interior designs with our tailored packages.
//         </Subheading>
//       </HeroSection>

//       <PackagesSection>
//         {/* Silver Plan */}
//         <PackageCard $bgColor="#e0e0e0" $textColor="#333">
//           <PackageTitle>Silver Plan</PackageTitle>
//           <PackagePrice>$99</PackagePrice>
//           <PackageFeatures>
//             <FeatureItem $featureColor="#000">5 High-Quality Design Renders</FeatureItem>
//             <FeatureItem $featureColor="#000">Standard Templates</FeatureItem>
//             <FeatureItem $featureColor="#000">Basic Customization Options</FeatureItem>
//           </PackageFeatures>
//           <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(99)}>
//             Buy Credits
//           </ChooseButton>
//         </PackageCard>

//         {/* Gold Plan */}
//         <PackageCard $bgColor="#f0c040" $textColor="#fff">
//           <PackageTitle>Gold Plan</PackageTitle>
//           <PackagePrice>$199</PackagePrice>
//           <PackageFeatures>
//             <FeatureItem $featureColor="#fff">15 High-Quality Design Renders</FeatureItem>
//             <FeatureItem $featureColor="#fff">Advanced Templates</FeatureItem>
//             <FeatureItem $featureColor="#fff">Enhanced Customization Options</FeatureItem>
//             <FeatureItem $featureColor="#fff">Priority Support</FeatureItem>
//           </PackageFeatures>
//           <ChooseButton $bgColor="#fff" $hoverColor="#f0c040" onClick={() => handlePayment(199)}>
//             Buy Credits
//           </ChooseButton>
//         </PackageCard>

//         {/* Platinum Plan */}
//         <PackageCard $bgColor="#e5e4e2" $textColor="#333">
//           <PackageTitle>Platinum Plan</PackageTitle>
//           <PackagePrice>$299</PackagePrice>
//           <PackageFeatures>
//             <FeatureItem $featureColor="#000">Unlimited High-Quality Design Renders</FeatureItem>
//             <FeatureItem $featureColor="#000">Premium Templates</FeatureItem>
//             <FeatureItem $featureColor="#000">Full Customization Options</FeatureItem>
//             <FeatureItem $featureColor="#000">Dedicated Support & Consulting</FeatureItem>
//             <FeatureItem $featureColor="#000">High-Resolution Exports</FeatureItem>
//           </PackageFeatures>
//           <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(299)}>
//             Buy Credits
//           </ChooseButton>
//         </PackageCard>
//       </PackagesSection>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2024 AI Interior Designs. All rights reserved.</p>
//       </footer>
//     </PageContainer>
//   );
// };

// export default PricingPage;


'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';

// Styled Components
const PageContainer = styled.div`
  text-align: center;
  background: linear-gradient(135deg, #f4f4f4, #ffffff);
  padding: 20px;
  font-family: Arial, sans-serif;
  background-image: url('/path-to-your-doodle-image.png'); /* Replace with your doodle image */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const HeroSection = styled.section`
  padding: 40px;
  background-color: #fafafa;
  border-bottom: 1px solid #ddd;
`;

const Heading = styled.h1`
  font-size: 3em;
  margin-bottom: 10px;
  color: #333;
`;

const Subheading = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #666;
`;

const PackagesSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PackageCard = styled.div`
  background: ${(props) => props.$bgColor || '#fff'};
  color: ${(props) => props.$textColor || '#000'};
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  margin: 0 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const PackageTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`;

const PackagePrice = styled.p`
  font-size: 1.8em;
  margin: 10px 0;
`;

const PackageFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 1.1em;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  margin: 10px 0;
  color: ${(props) => props.$featureColor || '#000'};
`;

const ChooseButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.$bgColor || '#333'};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.$hoverColor || '#555'};
  }
`;

// Main Component for Pricing Page
const PricingPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js'; // Paystack inline script
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script when component unmounts
    };
  }, []);

  const handlePayment = (amount) => {
    if (!session) {
      alert('Please log in to make a purchase.');
      return;
    }

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Replace with your Paystack public key
      email: session.user.email, // Use the email from session
      amount: amount * 100, // Amount in kobo
      currency: 'KES', // Currency
      callback: function (response) {
        alert('Payment successful! Reference: ' + response.reference);
      },
      onClose: function () {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  };

  return (
    <PageContainer>
      <HeroSection>
        <Heading>Choose the Perfect Plan for Your Design Needs</Heading>
        <Subheading>
          Unlock the power of AI to generate stunning interior designs with our tailored packages.
        </Subheading>
      </HeroSection>

      <PackagesSection>
        {/* Silver Plan */}
        <PackageCard $bgColor="#e0e0e0" $textColor="#333">
          <PackageTitle>Silver Plan</PackageTitle>
          <PackagePrice>$99</PackagePrice>
          <PackageFeatures>
            <FeatureItem $featureColor="#000">5 High-Quality Design Renders</FeatureItem>
            <FeatureItem $featureColor="#000">Standard Templates</FeatureItem>
            <FeatureItem $featureColor="#000">Basic Customization Options</FeatureItem>
          </PackageFeatures>
          <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(99)}>
            Buy Credits
          </ChooseButton>
        </PackageCard>

        {/* Gold Plan */}
        <PackageCard $bgColor="#f0c040" $textColor="#fff">
          <PackageTitle>Gold Plan</PackageTitle>
          <PackagePrice>$199</PackagePrice>
          <PackageFeatures>
            <FeatureItem $featureColor="#fff">15 High-Quality Design Renders</FeatureItem>
            <FeatureItem $featureColor="#fff">Advanced Templates</FeatureItem>
            <FeatureItem $featureColor="#fff">Enhanced Customization Options</FeatureItem>
            <FeatureItem $featureColor="#fff">Priority Support</FeatureItem>
          </PackageFeatures>
          <ChooseButton $bgColor="#fff" $hoverColor="#f0c040" onClick={() => handlePayment(199)}>
            Buy Credits
          </ChooseButton>
        </PackageCard>

        {/* Platinum Plan */}
        <PackageCard $bgColor="#e5e4e2" $textColor="#333">
          <PackageTitle>Platinum Plan</PackageTitle>
          <PackagePrice>$299</PackagePrice>
          <PackageFeatures>
            <FeatureItem $featureColor="#000">Unlimited High-Quality Design Renders</FeatureItem>
            <FeatureItem $featureColor="#000">Premium Templates</FeatureItem>
            <FeatureItem $featureColor="#000">Full Customization Options</FeatureItem>
            <FeatureItem $featureColor="#000">Dedicated Support & Consulting</FeatureItem>
            <FeatureItem $featureColor="#000">High-Resolution Exports</FeatureItem>
          </PackageFeatures>
          <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(299)}>
            Buy Credits
          </ChooseButton>
        </PackageCard>
      </PackagesSection>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 AI Interior Designs. All rights reserved.</p>
      </footer>
    </PageContainer>
  );
};

export default PricingPage;
