import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.css';

interface LinkButtonProps {
    text: string;
    icon: React.ReactNode;
    to?: string;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
    className?: string;
}

const LinkButton = ({
    text,
    icon,
    to,
    href,
    target,
    rel,
    className
}: LinkButtonProps) => {
    const linkProps = {
        className: `link-button ${className || ''}`,
        target,
        rel: target === '_blank' ? 'noopener noreferrer' : rel
    };

    if (href) {
        return (
            <a href={href} {...linkProps}>
                {text}
                {icon && <span className="button-icon">{icon}</span>}
            </a>
        );
    }

    return (
        <Link to={to || '/'} {...linkProps}>
            {text}
            {icon && <span className="button-icon">{icon}</span>}
        </Link>
    );
};

export default LinkButton; 