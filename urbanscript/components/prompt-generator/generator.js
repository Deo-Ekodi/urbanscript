'use client';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '@/app/providers/providers';

const Card = styled.div`
    background-image: url('data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <rect width="100%" height="100%" fill="#000" />
          <!-- Stars -->
          <circle cx="100" cy="50" r="2" fill="white" />
          <circle cx="200" cy="150" r="1.5" fill="yellow" />
          <circle cx="300" cy="100" r="3" fill="lightblue" />
          <circle cx="400" cy="300" r="1.8" fill="pink" />
          <circle cx="500" cy="200" r="2.5" fill="orange" />
          <circle cx="600" cy="400" r="1.2" fill="cyan" />
          <circle cx="700" cy="350" r="3" fill="white" />
          <circle cx="150" cy="400" r="2.5" fill="lightgreen" />
          <circle cx="250" cy="50" r="1.8" fill="violet" />
          <circle cx="350" cy="250" r="2" fill="lightcoral" />
          <circle cx="450" cy="150" r="2.5" fill="gold" />
          <circle cx="550" cy="450" r="1.5" fill="lime" />
          <circle cx="650" cy="300" r="3" fill="deepskyblue" />
          <circle cx="750" cy="200" r="2" fill="magenta" />
          <!-- Cosmic Doodles -->
          <path d="M150 400 C150 380, 180 380, 180 400 C180 420, 150 420, 150 400 Z" fill="rgba(255, 255, 255, 0.2)" />
          <path d="M300 500 Q320 480, 340 500 T360 500" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
          <path d="M450 100 Q470 80, 490 100 T510 100" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
          <text x="50%" y="50%" text-anchor="middle" fill="rgba(255, 255, 255, 0.1)" font-size="80" font-family="Arial">✨</text>
        </svg>
    `)}');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
    animation: bounce 2s infinite;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.03);
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: White;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    margin: 10px 0 5px;
    color: #555;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: border 0.3s;

    &:focus {
        border: 1px solid #84fab0;
        outline: none;
    }
`;

const Button = styled.button`
    background: #38a169;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s, transform 0.3s;

    &:hover {
        background: #2f855a;
        transform: translateY(-2px);
    }
`;

const CopyButton = styled(Button)`
    margin-top: 15px;
`;

const TickIcon = styled.span`
    margin-left: 10px;
    color: green;
    display: ${({ show }) => (show ? 'inline' : 'none')};
`;

const Generator = () => {

    const { user } = useContext(AuthContext); // Get the user context

    const perspectives = [
        "Eye-Level View", "Low Angle View", "High Angle View", "Bird's Eye View",
        "Worm's Eye View", "Three-Quarter View", "Straight-On View", "Diagonal View",
        "Close-Up View", "Wide-Angle View"
    ];

    const spaceTypes = [
        "Living Room", "Kitchen", "Dining Room", "Bedroom", "Bathroom", 
        "Home Office", "Children's Room", "Laundry Room", "Garage", 
        "Basement", "Attic", "Entryway/Foyer", "Hallway", "Closet", 
        "Pantry", "Mudroom", "Balcony/Patio", "Home Gym", "Home Theater"
    ];

    const furnitureOptions = {
        "Living Room": ['Sofa', 'Coffee Table', 'TV Stand', 'Bookshelf', 'Carpet', 'Armchair', 'Ottoman', 'Side Table', 'Console Table', 'Entertainment Center', 'Display Cabinet', 'Shelving Unit', 'Fireplace', 'Lounge Chair'],
        "Kitchen": ['Dining Table', 'Chair', 'Kitchen Cabinet', 'Stove', 'Refrigerator', 'Kitchen Island', 'Bar Stool', 'Range Hood', 'Microwave', 'Dishwasher', 'Sink', 'Oven', 'Cooktop', 'Counter'],
        "Dining Room": ['Dining Table', 'Chair', 'Bar Counter', 'Wine Cabinet', 'Buffet Table', 'Sideboard', 'Hutch', 'Credenza', 'Display Cabinet', 'Bar Cart', 'Serving Cart'],
        "Bedroom": ['Bed', 'Nightstand', 'Wardrobe', 'Dressing Table', 'Desk', 'Bookshelf', 'Dresser', 'Chest of Drawers', 'Armoire', 'Chaise Lounge', 'Vanity Set', 'Bed Bench', 'Headboard', 'Trundle Bed'],
        "Bathroom": ['Sink', 'Toilet', 'Bathtub', 'Shower', 'Mirror Cabinet', 'Vanity', 'Towel Rack', 'Shower Curtain', 'Shower Door', 'Bath Mat', 'Towel Warmer', 'Laundry Hamper', 'Bathroom Shelf', 'Shower Caddy'],
        "Home Office": ['Desk', 'Office Chair', 'Bookshelf', 'Filing Cabinet', 'Printer Stand', 'Bulletin Board', 'Whiteboard', 'Desk Lamp', 'Computer', 'Monitor', 'Keyboard', 'Mouse', 'Cable Management', 'Office Supplies'],
        "Children's Room": ['Crib', 'Changing Table', 'Rocking Chair', 'Dresser', 'Toy Box', 'Bookshelf', 'Rug', 'Nightstand', 'Wardrobe', 'Desk'],
        "Laundry Room": ['Washing Machine', 'Dryer', 'Laundry Basket', 'Ironing Board', 'Clothes Rack', 'Storage Shelves', 'Sink', 'Cabinets', 'Drying Rack', 'Laundry Sorter'],
        "Garage": ['Tool Cabinet', 'Workbench', 'Shelving Unit', 'Storage Boxes', 'Bike Rack', 'Ladder', 'Tool Chest', 'Pegboard', 'Tool Cart', 'Work Table'],
        "Basement": ['Sofa', 'TV Stand', 'Coffee Table', 'Bar Counter', 'Stools', 'Shelving Unit', 'Storage Boxes', 'Gym Equipment', 'Carpet', 'Desk'],
        "Attic": ['Storage Boxes', 'Chest', 'Trunk', 'Shelving Unit', 'Desk', 'Chair', 'Bed', 'Wardrobe', 'Carpet', 'Mirror'],
        "Entryway/Foyer": ['Console Table', 'Mirror', 'Coat Rack', 'Bench', 'Shoe Cabinet', 'Umbrella Stand', 'Carpet', 'Storage Baskets', 'Wall Hooks', 'Clock'],
        "Hallway": ['Console Table', 'Coat Rack', 'Shoe Cabinet', 'Mirror', 'Bench', 'Carpet', 'Wall Hooks', 'Storage Baskets', 'Umbrella Stand', 'Clock'],
        "Closet": ['Wardrobe', 'Dresser', 'Shoe Rack', 'Shelving Unit', 'Mirror', 'Tie Rack', 'Laundry Basket', 'Jewelry Organizer', 'Storage Boxes', 'Clothes Hangers'],
        "Pantry": ['Shelving Unit', 'Storage Baskets', 'Wine Rack', 'Canisters', 'Spice Rack', 'Food Containers', 'Drawer Organizers', 'Jar Labels', 'Storage Bins', 'Pantry Moth Trap'],
        "Mudroom": ['Bench', 'Coat Rack', 'Shoe Cabinet', 'Storage Baskets', 'Rug', 'Mirror', 'Wall Hooks', 'Umbrella Stand', 'Cabinets', 'Boot Tray'],
        "Balcony/Patio": ['Patio Table', 'Patio Chairs', 'Lounge Chair', 'Umbrella', 'BBQ Grill', 'Planters', 'Outdoor Rug', 'Outdoor Lighting', 'Fire Pit', 'Hammock'],
        "Home Gym": ['Treadmill', 'Exercise Bike', 'Weight Bench', 'Dumbbells', 'Yoga Mat', 'Resistance Bands', 'Medicine Ball', 'Elliptical Machine', 'Rowing Machine', 'Gym Mirror'],
        "Home Theater": ['TV Stand', 'TV', 'Sofa', 'Recliner', 'Coffee Table', 'Sound System', 'Media Cabinet', 'Popcorn Machine', 'Projector', 'Movie Posters']
    };

    const layouts = [
        "Open Plan", "Closed Plan", "U-shaped Layout", "L-shaped Layout", 
        "Parallel Layout", "Island Layout"
    ];

    const styles = [
        "Modern", "Contemporary", "Minimalist", "Industrial", "Mid-Century Modern",
        "Scandinavian", "Traditional", "Transitional", "French Country", 
        "Bohemian (Boho)", "Rustic", "Shabby Chic", "Coastal (Hamptons)", 
        "Hollywood Regency", "Farmhouse", "Craftsman", "Art Deco", "Asian Zen", 
        "Moroccan", "Mediterranean", "Victorian", "Gothic", "Tudor", 
        "English Country", "American Colonial", "Georgian", "Greek Revival", 
        "Spanish", "Italianate", "Prairie", "Southwestern", "Art Nouveau", 
        "Brutalist", "Bauhaus", "Rococo", "Neoclassical", "Japandi", 
        "Biophilic Design", "Hygge", "Wabi-Sabi", "Traditional Chinese", 
        "Chinese Art Deco", "Chinese Modern", "Chinese Zen", 
        "Chinese Chinoiserie", "Chinese Ming Style"
    ];

    const colorPalettes = [
        "Monochromatic", "Analogous", "Complementary", "Triadic", 
        "Split-Complementary", "Square", "Rectangle (Tetradic)", 
        "Neutral", "Warm", "Cool", "Pastel", "Vibrant"
    ];

    const lightings = [
        "Ambient Lighting", "Task Lighting", "Accent Lighting", 
        "Decorative Lighting", "Natural Lighting", "Cove Lighting", 
        "Recessed Lighting", "Track Lighting", "Pendant Lighting", 
        "Chandeliers", "Table Lamps", "Floor Lamps", "Wall Sconces", 
        "String Lights"
    ];

    const [selectedPerspective, setSelectedPerspective] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [selectedFurniture, setSelectedFurniture] = useState('');
    const [selectedLayout, setSelectedLayout] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedColorPalette, setSelectedColorPalette] = useState('');
    const [selectedLighting, setSelectedLighting] = useState('');

    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copied, setCopied] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleGeneratePrompt = () => {

        // if (!user) {
        //     setErrorMessage('You must be logged in to generate a prompt.');
        //     return;
        // }

        // Validate selections before generating the prompt
        if (!selectedPerspective || !selectedSpace || !selectedLayout || !selectedStyle || !selectedColorPalette || !selectedLighting) {
            alert('Please select all options before generating a prompt!');
            return;
        }

        const prompt = `Design a ${selectedPerspective} view of a ${selectedSpace} with a ${selectedLayout} layout, styled in ${selectedStyle} using a ${selectedColorPalette} color palette and ${selectedLighting} lighting.`;
        setGeneratedPrompt(prompt);
        alert(prompt);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Show tick for 2 seconds
            })
            .catch(err => console.error('Failed to copy: ', err));
    };


    return (
        <Card>
            <Title>Room Design Prompt Generator</Title>
            <Label>Perspective:</Label>
            <Select onChange={(e) => setSelectedPerspective(e.target.value)}>
                <option value="">Select Perspective</option>
                {perspectives.map((perspective) => (
                    <option key={perspective} value={perspective}>{perspective}</option>
                ))}
            </Select>
            <Label>Space Type:</Label>
            <Select onChange={(e) => {
                setSelectedSpace(e.target.value);
                setSelectedFurniture(furnitureOptions[e.target.value][0] || '');
            }}>
                <option value="">Select Space</option>
                {spaceTypes.map((space) => (
                    <option key={space} value={space}>{space}</option>
                ))}
            </Select>
            {selectedSpace && (
                <>
                    <Label>Furniture:</Label>
                    <Select onChange={(e) => setSelectedFurniture(e.target.value)}>
                        <option value="">Select Furniture</option>
                        {furnitureOptions[selectedSpace].map((furniture) => (
                            <option key={furniture} value={furniture}>{furniture}</option>
                        ))}
                    </Select>
                </>
            )}
            <Label>Layout:</Label>
            <Select onChange={(e) => setSelectedLayout(e.target.value)}>
                <option value="">Select Layout</option>
                {layouts.map((layout) => (
                    <option key={layout} value={layout}>{layout}</option>
                ))}
            </Select>
            <Label>Style:</Label>
            <Select onChange={(e) => setSelectedStyle(e.target.value)}>
                <option value="">Select Style</option>
                {styles.map((style) => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </Select>
            <Label>Color Palette:</Label>
            <Select onChange={(e) => setSelectedColorPalette(e.target.value)}>
                <option value="">Select Color Palette</option>
                {colorPalettes.map((palette) => (
                    <option key={palette} value={palette}>{palette}</option>
                ))}
            </Select>
            <Label>Lighting:</Label>
            <Select onChange={(e) => setSelectedLighting(e.target.value)}>
                <option value="">Select Lighting</option>
                {lightings.map((lighting) => (
                    <option key={lighting} value={lighting}>{lighting}</option>
                ))}
            </Select>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button onClick={handleGeneratePrompt}>Generate Prompt</Button>

            {generatedPrompt && (
                <CopyButton onClick={handleCopyToClipboard}>
                    Copy Prompt
                    <TickIcon show={copied}>✔</TickIcon>
                </CopyButton>
            )}
        </Card>
    );
};

export default Generator;


