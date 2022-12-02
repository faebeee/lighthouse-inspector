import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { Button, IconButton, ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import { version } from '../../package.json';
import { ArrowBack } from "@mui/icons-material";

export type LayoutProps = PropsWithChildren<{
    sidebar?: ReactNode;
    title?: string;
    projects: string[]
}>
const drawerWidth = 240;

export const Layout = ({ children, sidebar, title, projects, }: LayoutProps) => {
    return <Box>
        <Drawer
            sx={ {
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    background: 'transparent',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            } }
            variant={ 'permanent' }
            anchor="left"
        >
            <Toolbar>
                <Typography>Lighthouse Inspector</Typography>
            </Toolbar>

            <MenuList>
                <MenuItem>
                    <ListItemText>
                        Projects
                    </ListItemText>
                </MenuItem>
                { projects.map((name) => (
                    <Link href={ `/reports/${ name }` } key={ name }>
                        <MenuItem>
                            <ListItemText>
                                <Typography color={ 'secondary' }>{ name }</Typography>
                            </ListItemText>
                        </MenuItem>
                    </Link>
                )) }
                <Divider/>
                <Link href={ `/reports/new` }>
                    <MenuItem>
                        <ListItemText>
                            <Button fullWidth variant={ 'contained' } color={ 'primary' }>New</Button>
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Divider/>
                <Link href={ 'https://github.com/faebeee/lighthouse-inspector' } target={ '_blank' }>
                    <MenuItem>
                        <Typography variant={ 'caption' } color={ 'secondary' }>Github - v{ version }</Typography>
                    </MenuItem>
                </Link>
            </MenuList>
        </Drawer>
        <Box >
            <AppBar position={ 'relative' }
                variant={ 'outlined' }
                sx={ {
                    background: 'transparent',
                    left: `${ drawerWidth }px`,
                    maxWidth: `calc(100% - ${ drawerWidth }px)`,
                } }>
                <Toolbar variant={ 'regular' }>
                    <Link href={ '/' }>
                        <IconButton sx={ { mr: 1 } }>
                            <ArrowBack/>
                        </IconButton>
                    </Link>
                    <Typography variant="h5" noWrap>
                        { title }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={ {
                marginLeft: `${ drawerWidth }px`,
                p: 5,
            } }>
                { children }
            </Box>
        </Box>
    </Box>
}
