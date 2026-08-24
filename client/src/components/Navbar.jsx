import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import watchLogo from '../assets/watch-logo.svg';
import { navLinks } from '../data/navLinks';
import { searchSite } from '../data/searchIndex';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const desktopListboxId = useId();
  const mobileListboxId = useId();
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [resultsOpen, setResultsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchSite(query), [query]);
  const showResults = resultsOpen && query.trim().length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!showResults) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (
        desktopSearchRef.current?.contains(target) ||
        mobileSearchRef.current?.contains(target)
      ) {
        return;
      }
      setResultsOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [showResults]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveId('');
      return undefined;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goToResult = (href) => {
    setQuery('');
    setResultsOpen(false);
    setMenuOpen(false);

    const hashIndex = href.indexOf('#');
    if (hashIndex >= 0) {
      const pathname = href.slice(0, hashIndex) || '/';
      const hash = href.slice(hashIndex + 1);
      navigate({ pathname, hash });
      return;
    }

    navigate(href);
  };

  const handleSearchKeyDown = (event) => {
    if (!showResults) {
      if (event.key === 'Escape') {
        setQuery('');
        setResultsOpen(false);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length ? (index - 1 + results.length) % results.length : 0,
      );
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selected = results[activeIndex] ?? results[0];
      if (selected) goToResult(selected.href);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setResultsOpen(false);
    }
  };

  const handleNavClick = () => setMenuOpen(false);

  const renderResults = (listboxId) => (
    <ul
      id={listboxId}
      role="listbox"
      className="absolute inset-x-0 top-[calc(100%+0.35rem)] z-[60] max-h-72 overflow-auto rounded-md border border-gold/25 bg-navy-deep py-1 shadow-lg shadow-navy-deep/40"
    >
      {results.length === 0 ? (
        <li className="px-3 py-2.5 text-sm text-surface/70" role="presentation">
          לא נמצאו תוצאות לחיפוש.
        </li>
      ) : (
        results.map((result, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={result.id} role="option" aria-selected={isActive}>
              <button
                type="button"
                className={[
                  'flex w-full items-center justify-between gap-3 px-3 py-2.5 text-right text-sm transition-colors',
                  isActive ? 'bg-gold/15 text-gold' : 'text-surface/90 hover:bg-navy/60 hover:text-gold-bronze',
                ].join(' ')}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goToResult(result.href)}
              >
                <span className="font-medium">{result.title}</span>
                <span className="shrink-0 text-xs text-surface/50">{result.type}</span>
              </button>
            </li>
          );
        })
      )}
    </ul>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy/30 bg-navy-deep/95 text-surface backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link
          to="/#home"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="Time.il — מעבדת תיקון שעונים"
        >
          <img src={watchLogo} alt="" className="h-9 w-9" width={36} height={36} />
          <span className="font-script text-3xl leading-none text-gold md:text-4xl">
            Time.il
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="ניווט ראשי">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                className={[
                  'relative whitespace-nowrap rounded-sm px-2.5 py-1.5 text-sm font-medium transition-colors',
                  isActive ? 'text-gold' : 'text-surface/85 hover:text-gold-bronze',
                ].join(' ')}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gold" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <div ref={desktopSearchRef} className="relative hidden items-center sm:flex">
            <label className="relative flex items-center">
              <span className="sr-only">חיפוש באתר</span>
              <Search
                className="pointer-events-none absolute end-3 h-4 w-4 text-gold-bronze"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setResultsOpen(true);
                }}
                onFocus={() => setResultsOpen(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="חיפוש באתר..."
                role="combobox"
                aria-expanded={showResults}
                aria-controls={desktopListboxId}
                aria-autocomplete="list"
                className="w-40 rounded-md border border-gold/25 bg-navy/40 py-1.5 pe-9 ps-3 text-sm text-surface placeholder:text-surface/50 outline-none transition focus:border-gold/60 focus:ring-1 focus:ring-gold/40 md:w-52"
              />
            </label>
            {showResults ? renderResults(desktopListboxId) : null}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gold/30 p-2 text-gold transition hover:bg-gold/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}</span>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-navy/40 bg-navy-deep lg:hidden"
          role="dialog"
          aria-label="תפריט ניווט"
        >
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <div ref={mobileSearchRef} className="relative sm:hidden">
              <label className="relative flex items-center">
                <span className="sr-only">חיפוש באתר</span>
                <Search
                  className="pointer-events-none absolute end-3 h-4 w-4 text-gold-bronze"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setResultsOpen(true);
                  }}
                  onFocus={() => setResultsOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="חיפוש באתר..."
                  role="combobox"
                  aria-expanded={showResults}
                  aria-controls={mobileListboxId}
                  aria-autocomplete="list"
                  className="w-full rounded-md border border-gold/25 bg-navy/40 py-2 pe-9 ps-3 text-sm text-surface placeholder:text-surface/50 outline-none focus:border-gold/60"
                />
              </label>
              {showResults ? renderResults(mobileListboxId) : null}
            </div>

            <nav className="flex flex-col gap-1" aria-label="ניווט נייד">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={handleNavClick}
                    className={[
                      'rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-gold/15 text-gold'
                        : 'text-surface/90 hover:bg-navy/50 hover:text-gold-bronze',
                    ].join(' ')}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
