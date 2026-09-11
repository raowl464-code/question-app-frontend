import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const pages = ["Home", "CreatePost", "Profile", "Logout"];
const loginPages = ["Home", "Login"];

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsLoggedIn(false);

      navigate("/");
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Logo
            </Link>
          </Typography>

          {/* Mobile Menu Button */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {(isLoggedIn ? pages : loginPages).map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page === "Logout" ? (
                      page
                    ) : (
                      <Link
                        to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        {page}
                      </Link>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Logo
            </Link>
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {(isLoggedIn ? pages : loginPages).map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {page === "LogOut" ? (
                  page
                ) : (
                  <Link
                    to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Link>
                )}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
