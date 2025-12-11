const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} What to Wear (WTWR)</p>
    </footer>
  );
};

export default Footer;
