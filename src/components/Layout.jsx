import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect, useRef } from 'react'
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  AlertCircle,
  LogOut,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react'
import gsap from 'gsap'

const Layout = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [showContent, setShowContent] = useState(false)
  
  // Refs para a animação
  const splashRef = useRef(null)
  const logoRef = useRef(null)
  const lettersRef = useRef([])

  useEffect(() => {
    // Verificar se estamos na raiz
    const isRootPath = location.pathname === '/'
    
    if (!isRootPath) {
      // Se não estiver na raiz, não mostra splash screen
      setShowSplash(false)
      setShowContent(true)
      return
    }

    // Criar a timeline de animação
    const tl = gsap.timeline({
      onComplete: () => {
        setShowSplash(false)
        setShowContent(true)
      }
    })

    // Configurar estado inicial
    gsap.set(splashRef.current, { display: 'flex', autoAlpha: 1 })
    gsap.set(logoRef.current, { scale: 0, rotation: -180, opacity: 0 })
    gsap.set(lettersRef.current, { opacity: 0, y: 50 })

    // Animar logo entrando
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.2,
      rotation: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut"
    })

    // Animar letras do "Bibton" uma por uma
    .to(lettersRef.current, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    })

    // Pausa dramática
    .to({}, { duration: 0.8 })

    // Efeito de brilho no logo
    .to(logoRef.current, {
      boxShadow: "0 0 40px rgba(66, 153, 225, 0.9)",
      duration: 0.4,
      yoyo: true,
      repeat: 2,
      ease: "sine.inOut"
    })

    // Desvanecer splash screen com efeito
    .to(splashRef.current, {
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.inOut"
    })

    return () => {
      tl.kill()
    }
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActiveRoute = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true
    }
    return false
  }

  const getCurrentPageTitle = () => {
    const activeItem = navItems.find(item => isActiveRoute(item.path))
    return activeItem ? activeItem.label : 'Dashboard'
  }

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/usuarios', label: 'Usuários', icon: <Users size={20} /> },
    { path: '/livros', label: 'Livros', icon: <BookOpen size={20} /> },
    { path: '/emprestimos', label: 'Empréstimos', icon: <Calendar size={20} /> },
    { path: '/reservas', label: 'Reservas', icon: <Clock size={20} /> },
    { path: '/multas', label: 'Multas', icon: <AlertCircle size={20} /> },
  ]

  // Se não for a raiz, mostra o conteúdo diretamente
  if (location.pathname !== '/') {
    return (
      <DashboardContent 
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isActiveRoute={isActiveRoute}
        getCurrentPageTitle={getCurrentPageTitle}
        navItems={navItems}
      />
    )
  }

  // Na raiz, mostra splash screen primeiro
  return (
    <>
      {/* Splash Screen */}
      <div
        ref={splashRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        style={{ display: showSplash ? 'flex' : 'none' }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div
              ref={logoRef}
              className="w-32 h-32 bg-gradient-to-br from-vue-green to-vue-blue rounded-3xl flex items-center justify-center shadow-2xl"
              style={{ opacity: 0 }}
            >
              <BookOpen className="text-white" size={64} />
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 overflow-hidden">
            {['B', 'i', 'b', 't', 'o', 'n'].map((letter, index) => (
              <span
                key={index}
                ref={el => lettersRef.current[index] = el}
                className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-vue-green to-vue-blue bg-clip-text text-transparent inline-block"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Loading indicator */}
          <div className="mt-12">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-vue-green rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-vue-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-vue-green rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          <p className="mt-8 text-gray-600 dark:text-gray-400 text-lg animate-pulse">
            Sistema de Biblioteca Moderno
          </p>
        </div>
      </div>

      {/* Dashboard Content - só aparece após a animação */}
      {showContent && (
        <DashboardContent 
          user={user}
          theme={theme}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isActiveRoute={isActiveRoute}
          getCurrentPageTitle={getCurrentPageTitle}
          navItems={navItems}
        />
      )}
    </>
  )
}

// Componente separado para o conteúdo do dashboard
const DashboardContent = ({ 
  user, 
  theme, 
  toggleTheme, 
  handleLogout, 
  isMenuOpen, 
  setIsMenuOpen, 
  isActiveRoute, 
  getCurrentPageTitle, 
  navItems
}) => {
  // Animar entrada do dashboard quando aparecer
  const dashboardRef = useRef(null)

  useEffect(() => {
    if (dashboardRef.current) {
      gsap.fromTo(dashboardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
    }
  }, [])

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Header Moderno */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg dark:shadow-gray-900/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo e Menu Mobile */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-vue-green to-vue-blue rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-vue-green to-vue-blue bg-clip-text text-transparent">
                  Bibton
                </span>
              </Link>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-vue-green to-vue-blue text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-vue-green dark:hover:text-vue-green'
                  }`}
                >
                  <span className={isActiveRoute(item.path) ? 'text-white' : ''}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Indicador de página ativa */}
                  {isActiveRoute(item.path) && (
                    <span className="ml-1 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Controles Direita */}
            <div className="flex items-center space-x-4">
              {/* Indicador Mobile */}
              <div className="lg:hidden">
                <div className="px-3 py-1 bg-gradient-to-r from-vue-green/10 to-vue-blue/10 dark:from-vue-green/20 dark:to-vue-blue/20 rounded-full">
                  <span className="text-xs font-medium text-vue-green dark:text-vue-blue">
                    {getCurrentPageTitle()}
                  </span>
                </div>
              </div>

              {/* Toggle Tema */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:rotate-180"
                aria-label="Alternar tema"
              >
                {theme === 'light' ? (
                  <Moon className="text-gray-700" size={20} />
                ) : (
                  <Sun className="text-yellow-400" size={20} />
                )}
              </button>

              {/* User Info */}
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:block text-right">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {user.nome}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.cargo}
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-vue-green to-vue-blue rounded-full flex items-center justify-center text-white font-bold">
                      {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-gradient-to-r from-vue-green to-vue-blue text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-vue-green'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  
                  {isActiveRoute(item.path) && (
                    <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content - Aqui está o Outlet que estava faltando! */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          <Outlet />
        </div>
      </main>

      {/* Footer Moderno */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-vue-green to-vue-blue rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={16} />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">
                Bibton
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Sistema de Biblioteca Moderno • Engenharia de Software II
            </p>
            
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Tema: {theme === 'light' ? 'Claro' : 'Escuro'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout