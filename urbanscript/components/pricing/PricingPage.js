// 'use client';
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';

// const PageContainer = styled.div`
//   text-align: center;
//   background: linear-gradient(135deg, #f4f4f4, #ffffff);
//   padding: 20px;
//   font-family: Arial, sans-serif;
//   background-image: url('/path-to-your-doodle-image.png');
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

// const Banner = styled.div`
//   background-color: #ffeb3b;
//   color: #333;
//   padding: 15px;
//   margin: 20px 0;
//   font-size: 1.2em;
//   border-radius: 8px;
//   text-align: center;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// `;

// const BannerLink = styled(Link)`
//   color: #000;
//   font-weight: bold;
//   text-decoration: underline;
//   &:hover {
//     color: #ff9800;
//   }
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

// const CurrencySelect = styled.select`
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 1em;
// `;

// const PricingPage = () => {
//   const { data: session } = useSession();
//   const [currency, setCurrency] = useState('USD'); // Default currency to USD
//   const [prices, setPrices] = useState({
//     silver: 50,
//     gold: 300,
//     platinum: 600,
//   });

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://js.paystack.co/v1/inline.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     // Update prices based on selected currency
//     if (currency === 'USD') {
//       setPrices({
//         silver: 8, // 5 USD
//         gold: 13,  // 30 USD
//         platinum: 25, // 60 USD
//       });
//     } else if (currency === 'KES') {
//       setPrices({
//         silver: 1000,  // 50 KES
//         gold: 1700,   // 300 KES
//         platinum: 3250, // 600 KES
//       });
//     }
//   }, [currency]);

//   const handlePayment = (amount) => {
//     if (!session) {
//       alert('Please log in to make a purchase.');
//       return;
//     }

//     const handler = PaystackPop.setup({
//       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//       email: session.user.email,
//       amount: amount * 100, // Amount in the selected currency
//       currency: currency, // Currency (USD or KES)
//       callback: function (response) {
//         window.location.href = `/payment-success?reference=${response.reference}`;
//       },
//       onClose: function () {
//         alert('Transaction was not completed, window closed.');
//       },
//     });
//     handler.openIframe();
//   };

//   return (
//     <PageContainer>
//       <HeroSection>
//         <Heading>Choose the Perfect Plan for Your Design Needs</Heading>
//         <Subheading>
//           Unlock the power of AI to generate stunning interior designs with our tailored packages.
//         </Subheading>
//       </HeroSection>

//       {/* Currency Selector */}
//       <CurrencySelect value={currency} onChange={(e) => setCurrency(e.target.value)}>
//         <option value="USD">USD</option>
//         <option value="KES">KES</option>
//       </CurrencySelect>

//       <Banner>
//         Please review our <BannerLink href="/refund-policy">Refund Policy</BannerLink> before making any payments. We do not offer refunds after purchase.
//       </Banner>

//       <PackagesSection>
//         {/* Silver Plan */}
//         <PackageCard $bgColor="#e0e0e0" $textColor="#333">
//           <PackageTitle>Silver Plan</PackageTitle>
//           <PackagePrice>{prices.silver} {currency}</PackagePrice>
//           <PackageFeatures>
//             <FeatureItem $featureColor="#000">50 Credits</FeatureItem>
//             <FeatureItem $featureColor="#000">Latest AI model</FeatureItem>
//             <FeatureItem $featureColor="#000">High-Resolution Exports</FeatureItem>
//           </PackageFeatures>
//           <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(prices.silver)}>
//             Buy Credits
//           </ChooseButton>
//         </PackageCard>

//         {/* Gold Plan */}
//         <PackageCard $bgColor="#f0c040" $textColor="#fff">
//           <PackageTitle>Gold Plan</PackageTitle>
//           <PackagePrice>{prices.gold} {currency}</PackagePrice>
//           <PackageFeatures>
//             <FeatureItem $featureColor="#fff">100 Credits</FeatureItem>
//             <FeatureItem $featureColor="#fff">Latest AI model</FeatureItem>
//             <FeatureItem $featureColor="#fff">High-Resolution Exports</FeatureItem>
//           </PackageFeatures>
//           <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(prices.gold)}>
//             Buy Credits
//           </ChooseButton>
//         </PackageCard>

//         {/* Platinum Plan */}
//         <PackageCard $bgColor="#e5e4e2" $textColor="#333">
//           <PackageTitle>Platinum Plan</PackageTitle>
//           <PackagePrice>{prices.platinum} {currency}</PackagePrice>
//           <PackageFeatures>
//             <FeatureItem $featureColor="#000">250 Credits</FeatureItem>
//             <FeatureItem $featureColor="#000">Latest AI model</FeatureItem>
//             <FeatureItem $featureColor="#000">High-Resolution Exports</FeatureItem>
//           </PackageFeatures>
//           <ChooseButton $bgColor="#333" $hoverColor="#555" onClick={() => handlePayment(prices.platinum)}>
//             Buy Credits
//           </ChooseButton>
//         </PackageCard>
//       </PackagesSection>

//       <footer>
//         <p>&copy; 2024 Urban Script LLC. All rights reserved.</p>
//       </footer>
//     </PageContainer>
//   );
// };

// export default PricingPage;


'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const PageContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #1a1a1a; /* Dark background */
  background-image: url('/path-to-your-doodle-image.png'); /* Cool doodle background */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Ensure no overflow */
`;

const HeroSection = styled.section`
  padding: 40px;
  border-bottom: 1px solid #ddd;
`;

const Heading = styled.h1`
  font-size: 3em;
  margin-bottom: 10px;
  color: #ffeb3b; /* Bright color for contrast */
`;

const Subheading = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #ffffff; /* Light color for better readability */
`;

const Banner = styled.div`
  background-color: #ffeb3b;
  color: #333;
  padding: 15px;
  margin: 20px 0;
  font-size: 1.2em;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(255, 235, 59, 0.5);
`;

const BannerLink = styled(Link)`
  color: #000;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    color: #ff9800;
  }
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
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  color: #fff;
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  margin: 20px;
  backdrop-filter: blur(10px); /* Blur effect for cool aura */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 40px rgba(255, 255, 255, 0.2); /* Glow effect on hover */
  }

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const PackageTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 20px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7); /* Shadow for depth */
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
  color: #ffffff; /* Light color for better readability */
`;

const ChooseButton = styled.button`
  padding: 10px 20px;
  background-color: #ffeb3b; /* Bright button */
  color: #333;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fdd835; /* Lighter on hover */
  }
`;

const CurrencySelect = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  background-color: #333; /* Dark background for select */
  color: #fff; /* Light text color */
`;

const PricingPage = () => {
  const { data: session } = useSession();
  const [currency, setCurrency] = useState('USD'); // Default currency to USD
  const [prices, setPrices] = useState({
    silver: 50,
    gold: 300,
    platinum: 600,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Update prices based on selected currency
    if (currency === 'USD') {
      setPrices({
        silver: 8, // 5 USD
        gold: 13,  // 30 USD
        platinum: 25, // 60 USD
      });
    } else if (currency === 'KES') {
      setPrices({
        silver: 1000,  // 50 KES
        gold: 1700,   // 300 KES
        platinum: 3250, // 600 KES
      });
    }
  }, [currency]);

  const handlePayment = (amount) => {
    if (!session) {
      alert('Please log in to make a purchase.');
      return;
    }

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: session.user.email,
      amount: amount * 100, // Amount in the selected currency
      currency: currency, // Currency (USD or KES)
      callback: function (response) {
        window.location.href = `/payment-success?reference=${response.reference}`;
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

      {/* Currency Selector */}
      <CurrencySelect value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="KES">KES</option>
      </CurrencySelect>

      <Banner>
        Please review our <BannerLink href="/refund-policy">Refund Policy</BannerLink> before making any payments. We do not offer refunds after purchase.
      </Banner>

      <PackagesSection>
        {/* Silver Plan */}
        <PackageCard>
          <PackageTitle>Silver Plan</PackageTitle>
          <PackagePrice>{prices.silver} {currency}</PackagePrice>
          <PackageFeatures>
            <FeatureItem>50 Credits</FeatureItem>
            <FeatureItem>Latest AI model</FeatureItem>
            <FeatureItem>High-Resolution Exports</FeatureItem>
          </PackageFeatures>
          <ChooseButton onClick={() => handlePayment(prices.silver)}>
            Buy Credits
          </ChooseButton>
        </PackageCard>

        {/* Gold Plan */}
        <PackageCard>
          <PackageTitle>Gold Plan</PackageTitle>
          <PackagePrice>{prices.gold} {currency}</PackagePrice>
          <PackageFeatures>
            <FeatureItem>100 Credits</FeatureItem>
            <FeatureItem>Latest AI model</FeatureItem>
            <FeatureItem>High-Resolution Exports</FeatureItem>
          </PackageFeatures>
          <ChooseButton onClick={() => handlePayment(prices.gold)}>
            Buy Credits
          </ChooseButton>
        </PackageCard>

        {/* Platinum Plan */}
        <PackageCard>
          <PackageTitle>Platinum Plan</PackageTitle>
          <PackagePrice>{prices.platinum} {currency}</PackagePrice>
          <PackageFeatures>
            <FeatureItem>250 Credits</FeatureItem>
            <FeatureItem>Latest AI model</FeatureItem>
            <FeatureItem>High-Resolution Exports</FeatureItem>
          </PackageFeatures>
          <ChooseButton onClick={() => handlePayment(prices.platinum)}>
            Buy Credits
          </ChooseButton>
        </PackageCard>
      </PackagesSection>

      <footer>
        <p style={{ color: '#fff' }}>&copy; 2024 Urban Script LLC. All rights reserved.</p>
      </footer>
    </PageContainer>
  );
};

export default PricingPage;
