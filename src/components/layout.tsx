import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import { version } from '../../package.json';

export type LayoutProps = PropsWithChildren<{
    sidebar?: ReactNode;
    title?: string;
    projects: string[]
}>
const drawerWidth = 240;

export const Layout = ({ children, sidebar, title, projects, }: LayoutProps) => {
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
            <MenuList>
                { projects.map((name) => (
                    <Link href={ `/reports/${ name }` } key={ name }>
                        <MenuItem>
                            <ListItemText>{ name }</ListItemText>
                        </MenuItem>
                    </Link>
                )) }
                <Divider/>
                <Link href={ `/reports/new` }>
                    <MenuItem>
                        <ListItemText>New</ListItemText>
                    </MenuItem>
                </Link>
                <Divider/>
                <Link href={ 'https://github.com/faebeee/lighthouse-inspector' } target={ '_blank' }>
                    <MenuItem>
                        <Typography variant={ 'caption' }>Github - v{ version }</Typography>
                    </MenuItem>
                </Link>
            </MenuList>
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
