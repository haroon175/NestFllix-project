import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar, 
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
import WidgetsIcon from '@mui/icons-material/Widgets';
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Logo from "../../nest.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeIcon from '@mui/icons-material/Home';


const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Categories");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      background: {
        default: "#121212",
      },
    },
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/genres`);
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tmdb/search?title=${event.target.value.trim()}`);
        const data = await response.json();
        setSearchResults(data.movies || []);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movie) => {
    if (movie.id) {
      navigate(`/videoPlay/${movie.id}`, { state: { movie } });
    } else {
      navigate(`/videoPlay`, { state: { movie } });
    }
    setSearchResults([]);
  };
  

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box
      sx={{
        backgroundColor: 'black',
        width: 250,
        padding: 2,
        borderRight: '5px solid #950101',
      }}
      role="presentation"
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'black',
          zIndex: 1,
          paddingBottom: 8,
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{
            height: "50px",
            width: "auto",
            objectFit: "contain",
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate('/');
            toggleDrawer();
          }}
        />
      </div>
      <List>
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            onClick={() => handleCategoryClick(genre.name, genre.id)}
          >
            <ListItemText primary={genre.name} sx={{ fontFamily: 'Bebas Neue' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <ThemeProvider theme={theme}>
  <CssBaseline />
  <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
  <Toolbar>
    {/* Logo and Home Tab */}
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      <img
        src={Logo}
        alt="logo"
        style={{
          height: "70px",
          width: "auto",
          objectFit: "contain",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
      <IconButton
        onClick={() => navigate("/movies/dashboard")}
        sx={{
          color: "#950101",
          ml: 2,
          "&:hover": {
            backgroundColor: "transparent",
            color: "#950101",
          },
        }}
      >
        <HomeIcon sx={{ fontSize: "24px" }} />
      </IconButton>
    </Box>

    {/* Search Bar */}
    <Box sx={{ flexGrow: 2, position: "relative" }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search movies..."
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#950101" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#950101",
              borderRadius: "20px",
            },
            "&:hover fieldset": {
              borderColor: "#950101",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#950101",
            },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#950101",
          },
        }}
      />
      {searchResults.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#333",
            borderRadius: 1,
            boxShadow: 3,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            mt: 1,
          }}
        >
          <List>
            {searchResults.map((movie) => (
              <ListItem
                key={movie._id}
                onClick={() => handleMovieClick(movie)}
                sx={{ "&:hover": { backgroundColor: "#444" } }}
              >
                <ListItemText
                  primary={movie.title}
                  sx={{ color: "white", cursor: "pointer" }}
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
      sx={{
        display: { xs: "flex", md: "none" },
        color: "#950101",
        ml: 2,
      }}
    >
      {drawerOpen ? <CloseIcon /> : <WidgetsIcon />}
    </IconButton>

    {/* Dropdown for Laptop Screens */}
    <Button
      variant="outlined"
      onClick={handleMenuClick}
      sx={{
        display: { xs: "none", md: "flex" },
        color: "#950101",
        borderColor: "#950101",
        borderRadius: "20px",
        ml: 2,
        "&:hover": {
          borderColor: "#950101",
        },
      }}
    >
      <ArrowDropDownIcon sx={{ mr: 1 }} />
      {activeCategory}
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      sx={{ mt: 1 }}
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
  </Toolbar>
</AppBar>


  {/* Drawer for Mobile Screens */}
  <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
    {drawerContent}
  </Drawer>
</ThemeProvider>

  );
};

export default Navbar;
