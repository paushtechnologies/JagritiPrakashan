import React from 'react';
import { Box, Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { Home, CollectionsBookmark, ShoppingCart, Business, PermMedia } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileBottomNav({ cartCount = 0 }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine current value based on path
    const getValue = () => {
        const path = location.pathname;
        if (path === '/') return 0;
        if (path.startsWith('/gallery')) return 1;
        if (path.startsWith('/cart')) return 2;
        if (path.startsWith('/about')) return 3;
        if (path.startsWith('/media')) return 4;
        return 0;
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                width: "100vw", // 👈 Ensure full viewport width
                display: { xs: 'block', sm: 'none' }, // Mobile only
                zIndex: 1300,
                background: "linear-gradient(90deg, rgba(13,27,42,1) 0%, rgba(13,27,42,0.7) 25%, #2b2926ff 45%, rgba(13,27,42,0.7) 75%, rgba(13,27,42,0.8) 100%)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 0,
                m: 0,
                pb: 'env(safe-area-inset-bottom)', // Covers safe area with background
                boxShadow: "0 -2px 10px rgba(0,0,0,0.3)", // Shadow only on top
            }}
        >
            <style>
                {`
                    @keyframes badgePop {
                        0% { transform: scale(0.6); opacity: 0; }
                        70% { transform: scale(1.15); }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>
            <BottomNavigation
                showLabels
                value={getValue()}
                onChange={(event, newValue) => {
                    switch (newValue) {
                        case 0: navigate('/'); break;
                        case 1: navigate('/gallery'); break;
                        case 2: navigate('/cart'); break;
                        case 3: navigate('/about'); break;
                        case 4: navigate('/media'); break;
                    }
                }}
                sx={{
                    height: 56, // Standard height provides more room for badges
                    bgcolor: "transparent",
                    "& .MuiBottomNavigationAction-root": {
                        color: "#fff", // White icons by default
                        minWidth: "auto",
                        padding: "6px 0",
                        position: "relative",
                        "& .MuiSvgIcon-root": {
                            filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.8))", // 👈 Added shadow for visibility
                        },
                        "&.Mui-selected": {
                            color: "#fff",
                            "& .MuiSvgIcon-root": {
                                transform: "scale(1.1)",
                                filter: "drop-shadow(0px 1px 3px rgba(0,0,0,1))", // Stronger shadow for selected
                            },
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "25%",
                                width: "50%",
                                height: "3px",
                                bgcolor: "#fff",
                            }
                        },
                        "& .MuiBottomNavigationAction-label": {
                            fontSize: "0.65rem",
                            textShadow: "0px 1px 2px rgba(0,0,0,0.8)", // 👈 Added shadow for text
                            "&.Mui-selected": { fontSize: "0.75rem" }
                        }
                    }
                }}
            >
                <BottomNavigationAction label="Home" icon={<Home />} />
                <BottomNavigationAction label="Gallery" icon={<CollectionsBookmark />} />
                <BottomNavigationAction
                    label="Cart"
                    icon={
                        <Badge
                            key={cartCount}
                            badgeContent={cartCount}
                            max={99999}
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: '#f0b04f',
                                    color: '#0d1b2a',
                                    fontWeight: 900,
                                    fontSize: '0.7rem',
                                    minWidth: 18,
                                    height: 18,
                                    padding: '0 6px',
                                    border: '1.5px solid #0d1b2a',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    animation: cartCount > 0 ? 'badgePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
                                    zIndex: 1,
                                    top: 2, // 👈 Shift down 2px to ensure it's within the bar
                                }
                            }}
                        >
                            <ShoppingCart />
                        </Badge>
                    }
                />
                <BottomNavigationAction label="About" icon={<Business />} />
                <BottomNavigationAction label="Media" icon={<PermMedia />} />
            </BottomNavigation>
        </Box>
    );
}
