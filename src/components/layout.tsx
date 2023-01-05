import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, ListItemText, MenuItem, MenuList, Stack } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from 'next/image';
import { PropsWithChildren, ReactNode } from 'react';
import { version } from '../../package.json';
import { NavigationEntry } from '../utils/get-navigation';
import { THEME } from "../../config";

export type LayoutProps = PropsWithChildren<{
    title?: string;
    navigation: NavigationEntry[];
    actions?: ReactNode;
    showSidebar?: boolean;
    showBack?: boolean;
    backLink?: string;
}>
const drawerWidth = 240;

export const Layout = ({
                           children,
                           title,
                           navigation,
                           actions,
                           showSidebar = true,
                           showBack = true,
                           backLink,
                       }: LayoutProps) => {
    const pages = navigation.filter((item) => !item.isGroup);
    const groups = navigation.filter((item) => item.isGroup);
    return <Box>
        { showSidebar && <Drawer
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
                <Image alt={ 'Logo' } src={ THEME.logo } width={ 50 } height={ 40 }/>
            </Toolbar>

            <MenuList>
                <MenuItem>
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
                    <ListItemText>
                        Groups
                    </ListItemText>
                </MenuItem>
                { groups.map((nav) => (<Link href={ nav.url } key={ nav.label }>
                    <MenuItem>
                        <ListItemText>
                            <Typography color={ 'secondary' }>{ nav.label }</Typography>
                        </ListItemText>
                    </MenuItem>
                </Link>)) }

                <Divider/>
                <Link href={ `/projects/new` }>
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
        </Drawer> }
        <Box>
            <AppBar position={ 'relative' }
                variant={ 'outlined' }
                sx={ {
                    background: 'transparent',
                    left: showSidebar ? `${ drawerWidth }px` : 0,
                    maxWidth: showSidebar ? `calc(100% - ${ drawerWidth }px)` : '100%',
                } }>
                <Toolbar variant={ 'regular' }>
                    <Stack direction={ 'row' } flex={ 1 } justifyContent={ 'space-between' } alignItems={ 'center' }
                        spacing={ 1 }>
                        <Stack direction={ 'row' } alignItems={ 'center' } spacing={ 1 }>

                            { !showSidebar && <Image alt={ 'Logo' } src={ THEME.logo } width={ 50 } height={ 40 }/> }

                            { showBack && <Link href={ backLink ?? '/' }>
                                <IconButton>
                                    <ArrowBack/>
                                </IconButton>
                            </Link> }
                            <Typography variant="h5" noWrap color={ 'textPrimary' }>
                                { title }
                            </Typography>
                        </Stack>
                        { actions }
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box sx={ {
                marginLeft: showSidebar ? `${ drawerWidth }px` : 0,
                p: 5,
            } }>
                { children }
            </Box>
        </Box>
    </Box>
}
