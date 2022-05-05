// import SideBar from '@components/SidceBar';
import { Container } from '@mui/material';

export default function PokedexLayout({ children }) {
  return (
    <Container component="main" maxWidth="md">
      <div >
        <main>
          <div >{children}</div>
        </main>
      </div>
    </Container>
  );
}
