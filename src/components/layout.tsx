import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, ListItemText, MenuItem, MenuList, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import React, { PropsWithChildren, ReactNode, useMemo } from "react";
import { version } from "../../package.json";
import { NavigationEntry } from "../utils/get-navigation";
import { THEME } from "../../config.web";
import { signIn, signOut, useSession } from "next-auth/react";
import { SystemIndicators } from "./system-indicators";

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
    const { data: session } = useSession();
    const pages = navigation.filter((item) => !item.isGroup);


    const hasSidebar = useMemo(() => {
        if (!session) {
            return false;
        }
        return showSidebar;
    }, [ showSidebar, session ]);


    return <Box>
        { hasSidebar && <Drawer
          sx={ {
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                  background: "transparent",
                  width: drawerWidth,
                  boxSizing: "border-box"
              }
          } }
          variant={ "permanent" }
          anchor="left"
        >
          <Toolbar>
            <Image alt={ "Logo" } src={ THEME.logo } width={ 50 } height={ 40 } />
          </Toolbar>

          <MenuList>
            <MenuItem>
              <ListItemText>
                <Link href={ `/projects/new` }>
                  <Button fullWidth variant={ "contained" } color={ "primary" }>New</Button>
                </Link>
              </ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemText>
                Menu
              </ListItemText>
            </MenuItem>
            <Link href={ "/" }>
              <MenuItem>
                <ListItemText>
                  <Typography color={ "secondary" }>Dashboard</Typography>
                </ListItemText>
              </MenuItem>
            </Link>
            <Divider />

            <MenuItem>
              <ListItemText>
                Projects
              </ListItemText>
            </MenuItem>
              { pages.map((nav) => (<Link href={ nav.url } key={ nav.label }>
                  <MenuItem>
                      <ListItemText>
                          <Typography color={ "secondary" }>{ nav.label }</Typography>
                      </ListItemText>
                  </MenuItem>
              </Link>)) }
            <Divider />
          </MenuList>

          <SystemIndicators/>

          <Divider />
          <Link href={ "https://github.com/faebeee/lighthouse-inspector" } target={ "_blank" }>
            <MenuItem>
              <Typography variant={ "caption" } color={ "secondary" }>Github - v{ version }</Typography>
            </MenuItem>
          </Link>
        </Drawer> }
        <Box>
            <AppBar position={ 'sticky' }
                variant={ 'outlined' }
                sx={ {
                    background: "transparent",
                    left: hasSidebar ? `${ drawerWidth }px` : 0,
                    maxWidth: hasSidebar ? `calc(100% - ${ drawerWidth }px)` : "100%"
                } }>
                <Toolbar variant={ 'regular' }>
                    <Stack direction={ 'row' } flex={ 1 } justifyContent={ 'space-between' } alignItems={ 'center' }
                        spacing={ 1 }>
                        <Stack direction={ "row" } alignItems={ "center" } spacing={ 1 }>

                            { !hasSidebar && <Image alt={ "Logo" } src={ THEME.logo } width={ 50 } height={ 40 } /> }

                            { showBack && <Link href={ backLink ?? "/" }>
                              <IconButton>
                                <ArrowBack />
                              </IconButton>
                            </Link> }
                            <Typography variant="h5" noWrap color={ "textPrimary" }>
                                { title }
                            </Typography>

                            { session && actions }
                        </Stack>
                        <Stack direction={ "row" } alignItems={ "flex-end" } spacing={ 1 }>
                            { !session && <Button onClick={ () => signIn() }>Login</Button> }
                            { session && <Button variant={ "text" } onClick={ () => signOut() }>
                                { session.user?.name }
                            </Button> }
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box sx={ {
                marginLeft: hasSidebar ? `${ drawerWidth }px` : 0,
                p: 5
            } }>
                { session && children }
            </Box>
        </Box>
    </Box>
}
