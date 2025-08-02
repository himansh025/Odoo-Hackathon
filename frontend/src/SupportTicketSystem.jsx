import React, { useState, useEffect } from 'react';
import { 
  User, 
  Ticket, 
  MessageSquare, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  LogOut,
  Filter,
  Eye,
  Edit,
  Trash2,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  FileText,
  Calendar,
  HelpCircle
} from 'lucide-react';

const SupportTicketSystem = () => {
  const [currentUser, setCurrentUser] = useState({
    id: "64e4b2c97d3f1c8b2e3b4b1f",
    name: "Manshu",
    email: "manshu@example.com",
    role: "user"
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tickets, setTickets] = useState([
    {
      _id: "64c9a201",
      subject: "Login Issue",
      description: "Unable to login after password reset",
      status: "Open",
      category: { name: "Authentication" },
      createdBy: { name: "John Doe" },
      assignedTo: null,
      createdAt: "2025-08-02T08:00:00Z",
      comments: []
    },
    {
      _id: "64c9a202",
      subject: "Payment Processing Error",
      description: "Transaction failed with error code 500",
      status: "In Progress",
      category: { name: "Finance" },
      createdBy: { name: "Jane Smith" },
      assignedTo: { name: "Support Agent 1" },
      createdAt: "2025-08-01T14:30:00Z",
      comments: []
    },
    {
      _id: "64c9a203",
      subject: "Feature Request - Dark Mode",
      description: "Please add dark mode to the application",
      status: "Resolved",
      category: { name: "Feature Request" },
      createdBy: { name: "Alice Johnson" },
      assignedTo: { name: "Support Agent 2" },
      createdAt: "2025-07-30T09:15:00Z",
      comments: []
    }
  ]);
  
  const [categories] = useState([
    { id: "1", name: "Authentication" },
    { id: "2", name: "Finance" },
    { id: "3", name: "Feature Request" },
    { id: "4", name: "Bug Report" },
    { id: "5", name: "General Support" }
  ]);
  
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showAskModal, setShowAskModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    category: ''
  });
  const [askQuestion, setAskQuestion] = useState({
    question: '',
    description: '',
    tags: ''
  });
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'row'
    },
    sidebar: {
      width: '256px',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    sidebarHeader: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    sidebarTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    userSection: {
      padding: '16px',
      borderBottom: '1px solid #e5e7eb'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    userName: {
      fontWeight: '500',
      color: '#1f2937',
      margin: 0,
      fontSize: '14px'
    },
    userRole: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    },
    nav: {
      padding: '16px'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    navItem: {
      marginBottom: '8px'
    },
    navButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 12px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px'
    },
    navButtonActive: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8'
    },
    navButtonInactive: {
      color: '#6b7280'
    },
    logoutButton: {
      position: 'absolute',
      bottom: '16px',
      left: '16px',
      right: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 12px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px'
    },
    mainContent: { 
      padding: '32px',
      width: '100%', 
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    },
    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    primaryButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    askButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'background-color 0.2s'
    },
    searchBar: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px'
    },
    searchInput: {
      flex: 1,
      padding: '8px 12px 8px 40px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none'
    },
    searchInputContainer: {
      position: 'relative',
      flex: 1
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    select: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'white'
    },
    ticketGrid: {
      display: 'grid',
      gap: '16px'
    },
    ticketCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s'
    },
    ticketHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    ticketTitle: {
      fontWeight: '600',
      color: '#1f2937',
      fontSize: '16px',
      margin: 0
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    ticketDescription: {
      color: '#6b7280',
      marginBottom: '16px',
      lineHeight: '1.5',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    },
    ticketFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: '#6b7280'
    },
    ticketMeta: {
      display: 'flex',
      gap: '16px'
    },
    viewButton: {
      color: '#3b82f6',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      width: '100%',
      maxWidth: '500px',
      margin: '16px'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px'
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '24px'
    },
    secondaryButton: {
      padding: '8px 16px',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '14px'
    },
    ticketDetailCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      maxWidth: '1024px',
      margin: '0 auto'
    },
    ticketDetailHeader: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    ticketDetailTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    ticketDetailMeta: {
      display: 'flex',
      gap: '16px',
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '16px'
    },
    ticketDetailDescription: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      color: '#374151',
      lineHeight: '1.6'
    },
    commentsSection: {
      padding: '24px'
    },
    commentsTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    commentCard: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '16px'
    },
    commentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '8px'
    },
    commentAuthor: {
      fontWeight: '500',
      color: '#1f2937'
    },
    commentDate: {
      fontSize: '12px',
      color: '#6b7280'
    },
    commentText: {
      color: '#374151',
      lineHeight: '1.5'
    },
    commentForm: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '16px',
      display: 'flex',
      gap: '12px'
    },
    categoryCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px'
    },
    categoryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    categoryName: {
      fontWeight: '600',
      color: '#1f2937'
    },
    categoryActions: {
      display: 'flex',
      gap: '8px'
    },
    iconButton: {
      padding: '4px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '4px'
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '4px'
    },
    statIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    },
    recentSection: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    recentTicket: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6'
    },
    recentTicketInfo: {
      flex: 1
    },
    recentTicketTitle: {
      fontWeight: '500',
      color: '#1f2937',
      fontSize: '14px',
      margin: 0
    },
    recentTicketDate: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '2px'
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': 
        return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'in progress': 
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'resolved': 
        return { backgroundColor: '#d1fae5', color: '#065f46' };
      case 'closed': 
        return { backgroundColor: '#f3f4f6', color: '#374151' };
      default: 
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return <AlertCircle size={16} />;
      case 'in progress': return <Clock size={16} />;
      case 'resolved': return <CheckCircle size={16} />;
      case 'closed': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const getDashboardStats = () => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status.toLowerCase() === 'open').length;
    const inProgress = tickets.filter(t => t.status.toLowerCase() === 'in progress').length;
    const resolved = tickets.filter(t => t.status.toLowerCase() === 'resolved').length;
    
    return { total, open, inProgress, resolved };
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = () => {
    if (newTicket.subject && newTicket.description && newTicket.category) {
      const ticket = {
        _id: `64c9a${Date.now()}`,
        subject: newTicket.subject,
        description: newTicket.description,
        status: "Open",
        category: { name: categories.find(c => c.id === newTicket.category)?.name || '' },
        createdBy: { name: currentUser.name },
        assignedTo: null,
        createdAt: new Date().toISOString(),
        comments: []
      };
      
      setTickets([ticket, ...tickets]);
      setNewTicket({ subject: '', description: '', category: '' });
      setShowCreateTicket(false);
    }
  };

  const handleAskQuestion = () => {
    console.log('Ask button clicked');
    if (askQuestion.question && askQuestion.description) {
      const ticket = {
        _id: `64c9a${Date.now()}`,
        subject: askQuestion.question,
        description: askQuestion.description,
        status: "Open",
        category: { name: "General Support" },
        createdBy: { name: currentUser.name },
        assignedTo: null,
        createdAt: new Date().toISOString(),
        comments: [],
        tags: askQuestion.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setTickets([ticket, ...tickets]);
      setAskQuestion({ question: '', description: '', tags: '' });
      setShowAskModal(false);
    }
  };

  const handleAddComment = (ticketId) => {
    if (newComment.trim()) {
      const updatedTickets = tickets.map(ticket => {
        if (ticket._id === ticketId) {
          const comment = {
            _id: Date.now().toString(),
            text: newComment,
            author: { name: currentUser.name },
            createdAt: new Date().toISOString()
          };
          return { ...ticket, comments: [...ticket.comments, comment] };
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      setNewComment('');
      
      if (selectedTicket && selectedTicket._id === ticketId) {
        setSelectedTicket(updatedTickets.find(t => t._id === ticketId));
      }
    }
  };

  const Sidebar = () => (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h1 style={styles.sidebarTitle}>Support Portal</h1>
      </div>
      
      <div style={styles.userSection}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            <User size={20} />
          </div>
          <div>
            <p style={styles.userName}>{currentUser.name}</p>
            <p style={styles.userRole}>{currentUser.role}</p>
          </div>
        </div>
      </div>
      
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <button 
              onClick={() => setActiveTab('dashboard')}
              style={{
                ...styles.navButton,
                ...(activeTab === 'dashboard' ? styles.navButtonActive : styles.navButtonInactive)
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'dashboard') {
                  e.target.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'dashboard') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </button>
          </li>
          <li style={styles.navItem}>
            <button 
              onClick={() => setActiveTab('tickets')}
              style={{
                ...styles.navButton,
                ...(activeTab === 'tickets' ? styles.navButtonActive : styles.navButtonInactive)
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'tickets') {
                  e.target.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'tickets') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Ticket size={20} />
              <span>My Tickets</span>
            </button>
          </li>
          <li style={styles.navItem}>
            <button 
              onClick={() => setActiveTab('categories')}
              style={{
                ...styles.navButton,
                ...(activeTab === 'categories' ? styles.navButtonActive : styles.navButtonInactive)
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'categories') {
                  e.target.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'categories') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Settings size={20} />
              <span>Categories</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <button 
        style={styles.logoutButton}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );

  const Dashboard = () => {
    const stats = getDashboardStats();
    
    return (
      <div>
        <div style={styles.pageHeader}>
          <h2 style={styles.pageTitle}>Dashboard</h2>
          <button 
            onClick={() => setShowAskModal(true)}
            style={styles.askButton}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#059669'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#10b981'; }}
          >
            <HelpCircle size={16} />
            <span>Ask</span>
          </button>
        </div>
        
        <div style={styles.dashboardGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: '#dbeafe'}}>
              <FileText size={24} color="#3b82f6" />
            </div>
            <h3 style={styles.statValue}>{stats.total}</h3>
            <p style={styles.statLabel}>Total Tickets</p>
          </div>
          
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: '#fef3c7'}}>
              <AlertCircle size={24} color="#f59e0b" />
            </div>
            <h3 style={styles.statValue}>{stats.open}</h3>
            <p style={styles.statLabel}>Open Tickets</p>
          </div>
          
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: '#fef2f2'}}>
              <Clock size={24} color="#ef4444" />
            </div>
            <h3 style={styles.statValue}>{stats.inProgress}</h3>
            <p style={styles.statLabel}>In Progress</p>
          </div>
          
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: '#d1fae5'}}>
              <CheckCircle size={24} color="#10b981" />
            </div>
            <h3 style={styles.statValue}>{stats.resolved}</h3>
            <p style={styles.statLabel}>Resolved</p>
          </div>
        </div>
        
        <div style={styles.recentSection}>
          <h3 style={styles.sectionTitle}>Recent Tickets</h3>
          {tickets.slice(0, 5).map(ticket => (
            <div key={ticket._id} style={styles.recentTicket}>
              <div style={styles.recentTicketInfo}>
                <h4 style={styles.recentTicketTitle}>{ticket.subject}</h4>
                <p style={styles.recentTicketDate}>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span style={{...styles.statusBadge, ...getStatusColor(ticket.status)}}>
                {getStatusIcon(ticket.status)}
                <span>{ticket.status}</span>
              </span>
            </div>
          ))}
        </div>

        {showAskModal && (
          <div style={styles.modal} onClick={() => setShowAskModal(false)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Ask a Question</h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Question</label>
                <input
                  style={styles.input}
                  value={askQuestion.question}
                  onChange={(e) => setAskQuestion({ ...askQuestion, question: e.target.value })}
                  placeholder="Enter your question"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.textarea}
                  value={askQuestion.description}
                  onChange={(e) => setAskQuestion({ ...askQuestion, description: e.target.value })}
                  placeholder="Provide more details"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tags (comma-separated)</label>
                <input
                  style={styles.input}
                  value={askQuestion.tags}
                  onChange={(e) => setAskQuestion({ ...askQuestion, tags: e.target.value })}
                  placeholder="e.g., support, urgent"
                />
              </div>
              <div style={styles.modalActions}>
                <button
                  style={styles.secondaryButton}
                  onClick={() => setShowAskModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={styles.primaryButton}
                  onClick={handleAskQuestion}
                >
                  <Send size={16} />
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Tickets = () => (
    <div>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>My Tickets</h2>
        <button 
          onClick={() => setShowCreateTicket(true)}
          style={styles.primaryButton}
        >
          <Plus size={16} />
          <span>Create Ticket</span>
        </button>
      </div>
      <div style={styles.searchBar}>
        <div style={styles.searchInputContainer}>
          <Search style={styles.searchIcon} size={16} />
          <input
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets..."
          />
        </div>
        <select
          style={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div style={styles.ticketGrid}>
        {filteredTickets.map(ticket => (
          <div key={ticket._id} style={styles.ticketCard} onClick={() => setSelectedTicket(ticket)}>
            <div style={styles.ticketHeader}>
              <h3 style={styles.ticketTitle}>{ticket.subject}</h3>
              <span style={{...styles.statusBadge, ...getStatusColor(ticket.status)}}>
                {getStatusIcon(ticket.status)}
                <span>{ticket.status}</span>
              </span>
            </div>
            <p style={styles.ticketDescription}>{ticket.description}</p>
            <div style={styles.ticketFooter}>
              <div style={styles.ticketMeta}>
                <span>Created by: {ticket.createdBy.name}</span>
                {ticket.assignedTo && <span>Assigned to: {ticket.assignedTo.name}</span>}
              </div>
              <button style={styles.viewButton}>
                <Eye size={16} />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {showCreateTicket && (
        <div style={styles.modal} onClick={() => setShowCreateTicket(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Create New Ticket</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                style={styles.input}
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Enter subject"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                style={styles.textarea}
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
                style={styles.input}
                value={newTicket.category}
                onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div style={styles.modalActions}>
              <button
                style={styles.secondaryButton}
                onClick={() => setShowCreateTicket(false)}
              >
                Cancel
              </button>
              <button
                style={styles.primaryButton}
                onClick={handleCreateTicket}
              >
                <Send size={16} />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedTicket && (
        <div style={styles.modal} onClick={() => setSelectedTicket(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.ticketDetailCard}>
              <div style={styles.ticketDetailHeader}>
                <h3 style={styles.ticketDetailTitle}>{selectedTicket.subject}</h3>
                <span style={{...styles.statusBadge, ...getStatusColor(selectedTicket.status)}}>
                  {getStatusIcon(selectedTicket.status)}
                  <span>{selectedTicket.status}</span>
                </span>
              </div>
              <div style={styles.ticketDetailMeta}>
                <span>Created by: {selectedTicket.createdBy.name}</span>
                {selectedTicket.assignedTo && <span>Assigned to: {selectedTicket.assignedTo.name}</span>}
                <span>Created: {new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={styles.ticketDetailDescription}>
                {selectedTicket.description}
              </div>
              <div style={styles.commentsSection}>
                <h4 style={styles.commentsTitle}><MessageSquare size={16} /> Comments</h4>
                {selectedTicket.comments.map(comment => (
                  <div key={comment._id} style={styles.commentCard}>
                    <div style={styles.commentHeader}>
                      <span style={styles.commentAuthor}>{comment.author.name}</span>
                      <span style={styles.commentDate}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
                <div style={styles.commentForm}>
                  <input
                    style={{ ...styles.input, flex: 1 }}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <button
                    style={styles.primaryButton}
                    onClick={() => handleAddComment(selectedTicket._id)}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Categories = () => (
    <div>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>Categories</h2>
      </div>
      {categories.map(category => (
        <div key={category.id} style={styles.categoryCard}>
          <div style={styles.categoryHeader}>
            <h3 style={styles.categoryName}>{category.name}</h3>
            <div style={styles.categoryActions}>
              <button style={styles.iconButton}><Edit size={16} /></button>
              <button style={styles.iconButton}><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'tickets' && <Tickets />}
        {activeTab === 'categories' && <Categories />}
      </div>
    </div>
  );
};

export default SupportTicketSystem;