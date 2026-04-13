import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tracks", path: "/tracks" },
    { name: "Problems", path: "/problems" },
    { name: "Team", path: "/team" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      ...styles.nav,
      // Forces the background to be dark even at the very top for visibility
      backgroundColor: scrolled || isOpen ? "rgba(2, 6, 15, 0.98)" : "rgba(2, 6, 15, 0.85)",
      borderBottom: scrolled ? "1px solid rgba(34, 211, 238, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
    }}>
      <div style={styles.container}>
        
        {/* LOGO */}
        <Link to="/" style={styles.logo} onClick={() => setIsOpen(false)}>
          <div style={styles.logoBox}>
            <img src="/nexiotLogo.jpg" alt="Logo" style={styles.logoImg} />
          </div>
          <span style={styles.logoText}>Nexiot</span>
        </Link>

        {/* DESKTOP MENU */}
        {!isMobile && (
          <div style={styles.navLinks}>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} style={styles.navItem}>
                <span style={{
                  ...styles.linkText,
                  color: isActive(item.path) ? "#22d3ee" : "#f8fafc",
                }}>
                  {item.name}
                </span>
                {isActive(item.path) && <div style={styles.activeLine} />}
              </Link>
            ))}
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </div>
        )}

        {/* MOBILE TOGGLE */}
        {isMobile && (
          <div style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
            <div style={{...styles.line, transform: isOpen ? "rotate(45deg) translate(6px, 6px)" : "none", backgroundColor: "#22d3ee"}}></div>
            <div style={{...styles.line, opacity: isOpen ? 0 : 1}}></div>
            <div style={{...styles.line, transform: isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none", backgroundColor: "#22d3ee"}}></div>
          </div>
        )}
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div style={{
        ...styles.mobileMenu,
        maxHeight: isOpen ? "100vh" : "0px",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
      }}>
        <div style={styles.mobileLinkContainer}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)} 
              style={{
                ...styles.mobileLink,
                color: isActive(item.path) ? "#22d3ee" : "#f8fafc"
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/register" onClick={() => setIsOpen(false)} style={styles.mobileRegister}>
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    // CRITICAL FIXES FOR VISIBILITY
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 99999, // Extremely high to stay above 3D fiber and other sections
    height: "80px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "0 24px",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  },
  container: {
    maxWidth: "1300px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 100000,
  },
  logo: { display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" },
  logoBox: { width: "34px", height: "34px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(34, 211, 238, 0.3)" },
  logoImg: { width: "100%", height: "100%", objectFit: "cover" },
  logoText: { fontSize: "22px", fontWeight: "900", color: "#fff", letterSpacing: "-0.03em" },
  navLinks: { display: "flex", gap: "35px", alignItems: "center" },
  navItem: { position: "relative", textDecoration: "none", padding: "10px 0" },
  linkText: { fontSize: "14px", fontWeight: "600", transition: "0.3s" },
  activeLine: { position: "absolute", bottom: "-5px", left: 0, width: "100%", height: "2px", background: "#22d3ee", boxShadow: "0 0 10px #22d3ee" },
  registerBtn: { backgroundColor: "#22d3ee", color: "#020617", padding: "10px 24px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "800" },
  hamburger: { display: "flex", flexDirection: "column", gap: "6px", cursor: "pointer" },
  line: { width: "28px", height: "2.5px", transition: "0.3s ease", borderRadius: "2px" },
  mobileMenu: {
    position: "fixed", // Changed to fixed
    top: "0",
    left: 0,
    right: 0,
    height: "100vh",
    backgroundColor: "#020611",
    zIndex: 99998, // Just below the main nav bar
    transition: "all 0.5s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileLinkContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: "20px",
    width: "80%",
  },
  mobileLink: { fontSize: "24px", textDecoration: "none", fontWeight: "700", padding: "15px" },
  mobileRegister: { backgroundColor: "#22d3ee", color: "#020617", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "800", marginTop: "20px" }
};

export default Navbar;