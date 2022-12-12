import { ArrowBack, Folder, Newspaper } from "@mui/icons-material";
import { Button, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Stack } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import Link from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';
import { version } from '../../package.json';
import { NavigationEntry } from '../utils/get-navigation';

export type LayoutProps = PropsWithChildren<{
    sidebar?: ReactNode;
    title?: string;
    navigation: NavigationEntry[];
    actions?: ReactNode
}>
const drawerWidth = 240;

export const Layout = ({ children, sidebar, title, navigation, actions }: LayoutProps) => {
    const pages = navigation.filter((item) => !item.isGroup);
    const groups = navigation.filter((item) => item.isGroup);
    return <Box>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    background: 'transparent',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant={'permanent'}
            anchor="left"
        >
            <Toolbar>
                <Typography>Lighthouse Inspector</Typography>
            </Toolbar>

            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <Newspaper />
                    </ListItemIcon>
                    <ListItemText>
                        Projects
                    </ListItemText>
                </MenuItem>
                {pages.map((nav) => (<Link href={nav.url} key={nav.label}>
                    <MenuItem>
                        <ListItemText>
                            <Typography color={'secondary'}>{nav.label}</Typography>
                        </ListItemText>
                    </MenuItem>
                </Link>))}
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText>
                        Groups
                    </ListItemText>
                </MenuItem>
                {groups.map((nav) => (<Link href={nav.url} key={nav.label}>
                    <MenuItem>
                        <ListItemText>
                            <Typography color={'secondary'}>{nav.label}</Typography>
                        </ListItemText>
                    </MenuItem>
                </Link>))}

                <Divider />
                <Link href={`/projects/new`}>
                    <MenuItem>
                        <ListItemText>
                            <Button fullWidth variant={'contained'} color={'primary'}>New</Button>
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Divider />
                <Link href={'https://github.com/faebeee/lighthouse-inspector'} target={'_blank'}>
                    <MenuItem>
                        <Typography variant={'caption'} color={'secondary'}>Github - v{version}</Typography>
                    </MenuItem>
                </Link>
            </MenuList>
        </Drawer>
        <Box >
            <AppBar position={'relative'}
                variant={'outlined'}
                sx={{
                    background: 'transparent',
                    left: `${drawerWidth}px`,
                    maxWidth: `calc(100% - ${drawerWidth}px)`,
                }}>
                <Toolbar variant={'regular'}>
                    <Stack direction={'row'} spacing={1}>
                        <Link href={'/'}>
                            <IconButton>
                                <ArrowBack />
                            </IconButton>
                        </Link>
                        <Typography variant="h5" noWrap>
                            {title}
                        </Typography>
                        {actions}
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box sx={{
                marginLeft: `${drawerWidth}px`,
                p: 5,
            }}>
                {children}
            </Box>
        </Box>
    </Box>
}
