import logoSvg from '@/assets/logo.svg';

export default function Header() {
  return (
    <div>
      <div>
        <img alt='logo' src={logoSvg} />
        <span>React Playground</span>
      </div>
    </div>
  );
}
