import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type LayoutProps = PropsWithChildren<{
    sidebar?: ReactNode;
    title?: string;
}>
const drawerWidth = 240;

export const Layout = ({ children, sidebar, title }: LayoutProps) => {
    const [ open, setOpen ] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return <div>
        <Drawer
            sx={ {
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            } }
            variant={ 'permanent' }
            anchor="left"
        >
            { sidebar }
        </Drawer>
        <Box sx={ {
            marginLeft: `${ drawerWidth }px`,
            paddingTop: `80px`,
        } }>
            <AppBar position={ 'absolute' }
                sx={ {
                    left: `${ drawerWidth }px`,
                    maxWidth: `calc(100% - ${ drawerWidth }px)`,
                } }>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        { title ?? 'Lighthouse Inspector' }
                    </Typography>
                </Toolbar>
            </AppBar>
            { children }
        </Box>
    </div>
}
