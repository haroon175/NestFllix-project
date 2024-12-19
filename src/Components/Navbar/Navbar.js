import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import WidgetsIcon from '@mui/icons-material/Widgets';
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../nest.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const NGROK_URL = "https://coaches-kerry-import-handed.trycloudflare.com";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [genres, setGenres] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Categories");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f4f6f8",
      },
    },
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${NGROK_URL}/tmdb/genres`);
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category, id) => {
    setActiveCategory(category);
    setDrawerOpen(false);

    navigate(`/genre/${id}`);
  };

  const handleSearch = async (event) => {
    if (event.target.value.trim() !== "") {
      try {
        const response = await fetch(`${NGROK_URL}/tmdb/search?title=${event.target.value.trim()}`);
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/videoPlay/${id}`);
    setSearchResults([]);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, padding: 2 }}
      role="presentation"
    >
      <img
              src={Logo}
              alt="logo"
              style={{ height: "50px", width: "auto", objectFit: "contain", cursor: 'pointer' }}
              onClick={() => {
                navigate('/')
                toggleDrawer(); 
              }}
              
            />
      <List>
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            onClick={() => handleCategoryClick(genre.name, genre.id)}
          >
            <ListItemText primary={genre.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ backgroundColor: darkMode ? "black" : "white" }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} >
            <img
              src={Logo}
              alt="logo"
              style={{ height: "70px", width: "auto", objectFit: "contain", cursor: 'pointer' }}
              onClick={() => navigate('/')}
            />
          </Typography>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 2 }}>

            <TextField
              variant="outlined"
              size="small"
              placeholder="Search movies..."
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#950101' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: '5px',
                marginRight: '5px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#950101',
                  },
                  '&:hover fieldset': {
                    borderColor: '#950101',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#950101',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#950101',
                },
              }}
            />

            {searchResults.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  backgroundColor: darkMode ? "#333" : "#fff",
                  borderRadius: 1,
                  boxShadow: 3,
                  width: '270px',
                  height: '200px',
                  overflowY: 'auto'
                }}
              >
                <List>
                  {searchResults.map((movie) => (
                    <ListItem key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                      <ListItemText
                        primary={movie.title}
                        sx={{ color: darkMode ? 'white' : 'black', cursor: 'pointer' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>

          {/* Menu Button for Mobile */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ display: { xs: 'block', md: 'none' }, color: darkMode ? "yellow" : "black" }}
          >
            {drawerOpen ? <CloseIcon sx={{ color: "#950101" }} /> : <WidgetsIcon sx={{ color: "#950101" }} />}
          </IconButton>

          {/* Button for Laptop screens */}

          <Button
            variant="outlined"
            onClick={handleMenuClick}
            sx={{
              display: { xs: 'none', md: 'block' },
              color: darkMode ? '#950101' : '#950101',
              borderColor: darkMode ? '#950101' : '#950101', 
              fontSize: '14px',
              '&:hover': {
                borderColor: darkMode ? '#950101' : '#950101', 
              },
              marginRight:'5px'
            }}
          >
            <ArrowDropDownIcon sx={{ marginRight: '5px' }} />
            <span>{activeCategory}</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {genres.map((genre) => (
              <MenuItem
                key={genre.id}
                onClick={() => {
                  handleCategoryClick(genre.name, genre.id); 
                  handleMenuClose(); 
                }}

              >
                {genre.name}
              </MenuItem>
            ))}
          </Menu>

          {/* Theme Toggle Icon */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setDarkMode((prevMode) => !prevMode)}
            sx={{ color: darkMode ? "yellow" : "black" }}
          >
            {darkMode ? (
              <Brightness7Icon sx={{ color: "#950101" }} />
            ) : (
              <Brightness4Icon sx={{ color: "#950101" }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
