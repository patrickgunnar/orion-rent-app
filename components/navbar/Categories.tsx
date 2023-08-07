'use client'

import { useSearchParams } from 'next/navigation'
import CategoryBox from './CategoryBox'
import { 
    FaUmbrellaBeach,
    FaBuilding,
    FaSwimmingPool,
    FaMountain,
    FaStar,
    FaTree,
    FaRoute,
    FaCity,
    FaSkiing,
    FaPaw,
    FaWater,
    FaGolfBall,
    FaCameraRetro,
    FaFish,
    FaWarehouse,
    FaWineBottle,
    FaSun,
    FaChild,
    FaNetworkWired,
    FaTractor,
    FaSwimmer,
    FaStreetView
  } from 'react-icons/fa';


// categories
export const categories = [
    {
        id: 'beachfront_1',
        label: 'Beachfront',
        icon: FaUmbrellaBeach,
        description: 'Properties located directly on or very close to the beach.',
    },
    {
        id: 'modern_2',
        label: 'Modern',
        icon: FaBuilding,
        description: 'Contemporary and stylish properties with modern amenities.',
    },
    {
        id: 'swimming_pool_3',
        label: 'Swimming',
        icon: FaSwimmingPool,
        description: 'Properties equipped with a swimming pool for leisure and relaxation.',
    },
    {
        id: 'lake_view_4',
        label: 'Lake',
        icon: FaTractor,
        description: 'Properties with beautiful views of lakes or waterfronts.',
    },
    {
        id: 'countryside_5',
        label: 'Countryside',
        icon: FaMountain,
        description: 'Rural properties nestled in the picturesque countryside.',
    },
    {
        id: 'luxury_6',
        label: 'Luxury',
        icon: FaStar,
        description: 'High-end, luxurious properties with top-notch amenities.',
    },
    {
        id: 'garden_7',
        label: 'Garden',
        icon: FaTree,
        description: 'Properties featuring well-maintained gardens and green spaces.',
    },
    {
        id: 'mountain_view_8',
        label: 'Mountain',
        icon: FaMountain,
        description: 'Properties offering scenic views of mountains and natural landscapes.',
    },
    {
        id: 'historic_9',
        label: 'Historic',
        icon: FaRoute,
        description: 'Properties with historical significance and architectural charm.',
    },
    {
        id: 'city_center_10',
        label: 'City',
        icon: FaCity,
        description: 'Properties located in the heart of the city with easy access to amenities.',
    },
    {
        id: 'ski_resort_11',
        label: 'Skiing',
        icon: FaSkiing,
        description: 'Properties close to popular ski resorts and winter sports areas.',
    },
    {
        id: 'pet_friendly_12',
        label: 'Pet',
        icon: FaPaw,
        description: 'Properties that welcome pets and offer pet-friendly facilities.',
    },
    {
        id: 'ocean_view_13',
        label: 'Ocean',
        icon: FaWater,
        description: 'Properties with stunning views of the ocean and coastal areas.',
    },
    {
        id: 'golf_course_14',
        label: 'Golf',
        icon: FaGolfBall,
        description: 'Properties situated near golf courses and golfing facilities.',
    },
    {
        id: 'vintage_15',
        label: 'Vintage',
        icon: FaCameraRetro,
        description: 'Properties with a vintage charm and timeless appeal.',
    },
    {
        id: 'lakefront_16',
        label: 'Lakefront',
        icon: FaFish,
        description: 'Properties situated directly on or overlooking a lake.',
    },
    {
        id: 'remote_17',
        label: 'Remote',
        icon: FaStreetView,
        description: 'Secluded properties ideal for those seeking privacy and tranquility.',
    },
    {
        id: 'beach_resort_18',
        label: 'Beach',
        icon: FaSwimmer,
        description: 'Resort-style properties with beachside amenities and services.',
    },
    {
        id: 'riverside_19',
        label: 'Riverside',
        icon: FaWater,
        description: 'Properties situated along the banks of rivers or waterways.',
    },
    {
        id: 'farmhouse_20',
        label: 'Farmhouse',
        icon: FaWarehouse,
        description: 'Quaint properties with a rustic farmhouse appeal.',
    },
    {
        id: 'penthouse_21',
        label: 'Penthouse',
        icon: FaNetworkWired,
        description: 'Luxurious properties located on the top floors of buildings.',
    },
    {
        id: 'vineyard_22',
        label: 'Vineyard',
        icon: FaWineBottle,
        description: 'Properties surrounded by vineyards and wine-producing regions.',
    },
    {
        id: 'desert_view_23',
        label: 'Desert',
        icon: FaSun,
        description: 'Properties offering captivating views of deserts and arid landscapes.',
    },
    {
        id: 'family_friendly_24',
        label: 'Family',
        icon: FaChild,
        description: 'Properties suitable for families with children, equipped with family-oriented facilities.',
    },
    {
        id: 'forest_retreat_25',
        label: 'Forest',
        icon: FaTree,
        description: 'Properties nestled in lush forests, providing a serene retreat.',
    },
]

interface CategoriesProps {
    className: string
}

// categories box
const Categories: React.FC<CategoriesProps> = ({
    className
}) => {
    // get params
    const params = useSearchParams()
    // get category
    const category = params?.get('category')

    // render elements
    return (
        <div className={`[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}>
            {
                categories.map(item => (
                    <CategoryBox className="flex flex-col justify-center items-center transition gap-1 p-1 h-full"
                        key={item.label}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.id}
                    />
                ))
            }
        </div>
    );
}

export default Categories;
