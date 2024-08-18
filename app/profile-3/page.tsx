// "use client"
// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import CssBaseline from '@mui/material/CssBaseline';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import Resume from "@/app/profile/resume";
// import Notification from "@/app/profile/notification";
//
//
// const drawerWidth = 300;
//
// const Main = styled('main')<{ open?: boolean }>`
//   flex-grow: 1;
//   padding: 24px; /* Replace theme.spacing(3) */
//   transition: margin 0.3s;
//   margin-right: ${({ open }) => (open ? 0 : `-${drawerWidth}px`)};
//
// `;
// const ResumeWrapper = styled('div')`
//   width: 100%;
//   height: 100%;
//   /* Ensure the Resume component takes full available space */
// `;
//
// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
// }
//
// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//     transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginRight: drawerWidth,
//     }),
// }));
//
// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-start',
// }));
//
// export default function PersistentDrawerRight() {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//
//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };
//
//     const handleDrawerClose = () => {
//         setOpen(false);
//     };
//
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBar position="fixed" open={open}>
//                 <Toolbar>
//                     <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
//                     </Typography>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         edge="end"
//                         onClick={handleDrawerOpen}
//                         sx={{ ...(open && { display: 'none' }) }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>
//             <Main open={open}>
//                 <DrawerHeader />
//
//                 <ResumeWrapper>
//                     <Resume />
//                 </ResumeWrapper>
//
//
//             </Main>
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                     },
//                 }}
//                 variant="persistent"
//                 anchor="right"
//                 open={open}
//             >
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                     </IconButton>
//                 </DrawerHeader>
//                 <Notification/>
//             </Drawer>
//         </Box>
//     );
// }
