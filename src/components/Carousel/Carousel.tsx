import React, { useState, useEffect } from 'react';
import './Carousel.css';

interface CarouselProps {
    items: Array<{
        image: string;
        name: string;
    }>;
    itemsPerView?: number;
    autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
    items,
    itemsPerView = 4,
    autoPlayInterval = 2000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalGroups = Math.ceil(items.length / itemsPerView);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 >= totalGroups ? 0 : prevIndex + 1
            );
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [totalGroups, autoPlayInterval]);

    const visibleItems = Array.from({ length: totalGroups }).map((_, groupIndex) =>
        items.slice(groupIndex * itemsPerView, (groupIndex + 1) * itemsPerView)
    );

    return (
        <div className="carousel-container">
            <div className="carousel-viewport">
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {visibleItems.map((group, groupIndex) => (
                        <div key={groupIndex} className="carousel-group">
                            {group.map((item, index) => (
                                <div key={`${groupIndex}-${index}`} className="carousel-product">
                                    <div className="product-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <h3>{item.name}</h3>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel; 