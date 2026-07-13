'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Unlock, 
  Search, 
  Users, 
  Calendar, 
  Coins, 
  Eye, 
  LogOut, 
  ArrowUpDown, 
  FileText,
  AlertCircle,
  X,
  Sparkles,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface Submission {
  id: number;
  name: string;
  email: string;
  type: 'volunteer' | 'booking' | 'donation';
  date: string | null;
  guests: number | null;
  amount: string | null;
  message: string;
  created_at: string;
}

export default function AdminPortal() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'volunteer' | 'booking' | 'donation'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Deletion states
  const [subToDelete, setSubToDelete] = useState<Submission | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const validateAndFetch = async (tokenToCheck: string) => {
    setIsLoading(true);
    setAuthError('');
    
    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isMissingEnv = !baseApiUrl || baseApiUrl === 'undefined' || baseApiUrl.trim() === '';
    const apiUrl = isMissingEnv ? 'http://localhost:8000/api' : baseApiUrl;

    console.log('[Admin Dashboard API Request] Fetching from URL:', `${apiUrl}/admin/submissions`);

    try {
      const response = await fetch(`${apiUrl}/admin/submissions`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Admin-Token': tokenToCheck
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
        sessionStorage.setItem('adminToken', tokenToCheck);
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        let errorMsg = response.status === 401 
          ? 'Invalid Admin Token. Access Denied.' 
          : 'Server connection error.';
        if (isMissingEnv) {
          errorMsg += ' (Note: NEXT_PUBLIC_API_URL is not configured in your deployment environment).';
        }
        setAuthError(errorMsg);
      }
    } catch (error) {
      console.error('Admin Auth Error:', error);
      let errorMsg = 'Unable to connect to the backend server.';
      if (isMissingEnv) {
        errorMsg += ' (Note: NEXT_PUBLIC_API_URL environment variable is missing/undefined. Please configure it in your Railway dashboard to point to your backend API, e.g. https://your-backend.up.railway.app/api).';
      }
      setAuthError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Check sessionStorage for existing token on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('adminToken');
    if (savedToken) {
      Promise.resolve().then(() => {
        validateAndFetch(savedToken);
      });
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setAuthError('Please enter a token.');
      return;
    }
    validateAndFetch(token.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setSubmissions([]);
    setIsAuthenticated(false);
  };

  // Delete submission handler
  const handleDeleteSubmission = async (id: number) => {
    setIsDeleting(true);
    const savedToken = sessionStorage.getItem('adminToken') || '';
    const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = !baseApiUrl || baseApiUrl === 'undefined' || baseApiUrl.trim() === '' ? 'http://localhost:8000/api' : baseApiUrl;

    try {
      const response = await fetch(`${apiUrl}/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-Admin-Token': savedToken
        }
      });

      if (response.ok) {
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        setSubToDelete(null);
        setSelectedSub(null); // Close details modal if open
      } else {
        const errorData = await response.json();
        alert('Delete failed: ' + (errorData.message || 'Server error.'));
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Could not connect to server to delete submission.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Export Filtered Submissions to CSV
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Type', 'Booking Date', 'Guests', 'Donation Amount (Rs.)', 'Message', 'Submitted At'];
    
    const rows = filteredSubmissions.map(sub => [
      sub.id,
      `"${sub.name.replace(/"/g, '""')}"`,
      sub.email,
      sub.type,
      sub.date || '',
      sub.guests || '',
      sub.amount || '',
      `"${sub.message.replace(/"/g, '""')}"`,
      sub.created_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chain_free_submissions_${filterType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to format date strings
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  // Metrics calculations
  const totalSubmissions = submissions.length;
  const volunteerCount = submissions.filter(s => s.type === 'volunteer').length;
  const bookingCount = submissions.filter(s => s.type === 'booking').length;
  
  const donationRecords = submissions.filter(s => s.type === 'donation');
  const donationCount = donationRecords.length;
  const totalDonatedAmount = donationRecords.reduce((sum, item) => {
    const amt = parseFloat(item.amount || '0');
    return sum + (isNaN(amt) ? 0 : amt);
  }, 0);

  // Filtered & Sorted Submissions
  const filteredSubmissions = submissions
    .filter(sub => {
      // Type Filter
      if (filterType !== 'all' && sub.type !== filterType) {
        return false;
      }
      // Search Filter
      const search = searchQuery.toLowerCase().trim();
      if (!search) return true;

      return (
        sub.name.toLowerCase().includes(search) ||
        sub.email.toLowerCase().includes(search) ||
        sub.message.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  // Reset pagination dynamically if filtered records size shrinks
  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  // Paginated View Slicing
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  if (!isAuthenticated) {
    /* LOGIN LOCKSCREEN GATE */
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 p-8 rounded-2xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-800 dark:text-emerald-450 mx-auto border border-emerald-100 dark:border-emerald-900/35">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
              Please enter your security token to view form submissions and donation pledges.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Security Token</label>
              <input 
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter access token..."
                className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 dark:focus:ring-emerald-500/20 dark:focus:border-emerald-500 transition"
                required
              />
            </div>

            {authError && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 p-3 rounded-lg text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Unlocking...' : (
                <>
                  <Unlock className="w-4 h-4" /> Unlock Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    /* MAIN ADMIN DASHBOARD */
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 transition-colors duration-300">
      
      {/* Top Navbar */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850 h-16 sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-450 text-lg hover:scale-[1.01] transition-transform duration-250">
            <span>🐘</span> <span>The Chain Free Project</span>
            <span className="hidden sm:inline bg-stone-100 dark:bg-stone-850 text-stone-500 dark:text-stone-400 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border dark:border-stone-800 ml-2">
              Admin Portal
            </span>
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-red-650 dark:hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        
        {/* Metric Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Submissions */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-center text-stone-400 dark:text-stone-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Records</span>
              <FileText className="w-5 h-5 text-stone-400" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-stone-900 dark:text-white">{totalSubmissions}</p>
              <p className="text-[10px] text-stone-400 font-light">Submissions registered</p>
            </div>
          </div>

          {/* Donations Pledged */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-center text-stone-400 dark:text-stone-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Donations</span>
              <Coins className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-purple-750 dark:text-purple-400">Rs. {totalDonatedAmount.toLocaleString()}</p>
              <p className="text-[10px] text-stone-400 font-light">From {donationCount} pledges</p>
            </div>
          </div>

          {/* Volunteer Count */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-center text-stone-400 dark:text-stone-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Volunteers</span>
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-450">{volunteerCount}</p>
              <p className="text-[10px] text-stone-400 font-light">Active applications</p>
            </div>
          </div>

          {/* Visitor Bookings */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-center text-stone-400 dark:text-stone-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Visits Scheduled</span>
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-blue-800 dark:text-blue-450">{bookingCount}</p>
              <p className="text-[10px] text-stone-400 font-light">Ethical bookings</p>
            </div>
          </div>

        </div>

        {/* Filters and Search Bar Panel */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-805 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Tab Filter Selectors */}
            <div className="flex flex-wrap border-b dark:border-stone-800 md:border-b-0 gap-1">
              {(['all', 'volunteer', 'booking', 'donation'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => { setFilterType(type); setCurrentPage(1); }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition rounded-lg border ${
                    filterType === type
                      ? 'bg-emerald-850 dark:bg-emerald-800 border-emerald-800 text-white shadow-sm'
                      : 'bg-transparent text-stone-500 dark:text-stone-400 border-transparent hover:text-stone-700 dark:hover:text-stone-305'
                  }`}
                >
                  {type === 'all' ? 'All Forms' : type + 's'}
                </button>
              ))}
            </div>

            {/* Right Control Actions (Search, Sort, Export, Clear) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px] md:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search name, email, msg..."
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-750 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700/50 focus:border-emerald-700 dark:focus:border-emerald-500 transition"
                />
              </div>

              {/* Reset Filters */}
              {(searchQuery || filterType !== 'all' || sortOrder !== 'desc') && (
                <button
                  onClick={resetFilters}
                  className="p-2.5 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-850 text-stone-500 dark:text-stone-400 transition"
                  title="Clear Filters"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-once" />
                </button>
              )}

              {/* Sort Order Action */}
              <button
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="p-2.5 border border-stone-300 dark:border-stone-750 bg-stone-50 dark:bg-stone-950 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-850 text-stone-500 dark:text-stone-400 transition"
                title="Sort by Date"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>

              {/* Export to CSV */}
              <button
                onClick={handleExportCSV}
                className="p-2.5 border border-emerald-600/25 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition flex items-center gap-1.5 text-xs font-bold"
                title="Export list to CSV (Excel)"
              >
                <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>

          </div>

          {/* Submission Data Grid Table */}
          <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-xl">
            <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800 text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950 text-stone-450 dark:text-stone-550 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Submitter Details</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Details</th>
                  <th className="px-6 py-3.5">Submitted On</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900 transition-colors">
                {paginatedSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-stone-450 dark:text-stone-500 font-light">
                      No records match the current filter criteria or search query.
                    </td>
                  </tr>
                ) : (
                  paginatedSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-850/20 transition duration-150">
                      {/* Submitter Details */}
                      <td className="px-6 py-4 space-y-0.5">
                        <p className="font-bold text-stone-900 dark:text-white text-sm">{sub.name}</p>
                        <p className="text-stone-450 dark:text-stone-500 font-light">{sub.email}</p>
                      </td>
                      
                      {/* Type Badge */}
                      <td className="px-6 py-4">
                        {sub.type === 'volunteer' && (
                          <span className="bg-emerald-50 dark:bg-emerald-950/65 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            Volunteer
                          </span>
                        )}
                        {sub.type === 'booking' && (
                          <span className="bg-blue-50 dark:bg-blue-950/65 text-blue-800 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            Booking
                          </span>
                        )}
                        {sub.type === 'donation' && (
                          <span className="bg-purple-50 dark:bg-purple-950/65 text-purple-800 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            Donation
                          </span>
                        )}
                      </td>
                      
                      {/* Type Specific Info */}
                      <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                        {sub.type === 'volunteer' && (
                          <span className="italic font-light">Application form</span>
                        )}
                        {sub.type === 'booking' && (
                          <div className="space-y-0.5 text-[11px]">
                            <p><span className="text-stone-400">Date:</span> {sub.date}</p>
                            <p><span className="text-stone-400">Guests:</span> {sub.guests}</p>
                          </div>
                        )}
                        {sub.type === 'donation' && (
                          <span className="font-extrabold text-purple-750 dark:text-purple-400">
                            Rs. {parseFloat(sub.amount || '0').toLocaleString()}
                          </span>
                        )}
                      </td>
                      
                      {/* Submitted On Date */}
                      <td className="px-6 py-4 text-stone-450 dark:text-stone-500 font-light">
                        {formatDate(sub.created_at)}
                      </td>

                      {/* Actions (View and Delete) */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedSub(sub)}
                            className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 font-semibold px-2.5 py-1.5 rounded-lg transition"
                            title="View submission details"
                          >
                            <Eye className="w-3.5 h-3.5" /> <span className="hidden sm:inline">View</span>
                          </button>
                          <button
                            onClick={() => setSubToDelete(sub)}
                            className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-650 dark:text-red-400 font-semibold p-1.5 rounded-lg transition"
                            title="Delete submission record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION PANEL FOOTER */}
          {filteredSubmissions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t dark:border-stone-800 pt-4 gap-4">
              
              {/* Items Per Page Selector */}
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-750 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-emerald-700/50"
                >
                  <option value={5}>5 entries</option>
                  <option value={10}>10 entries</option>
                  <option value={25}>25 entries</option>
                  <option value={50}>50 entries</option>
                </select>
                <span>of {filteredSubmissions.length} records</span>
              </div>

              {/* Showing Metrics text */}
              <div className="text-xs text-stone-400 dark:text-stone-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSubmissions.length)} of {filteredSubmissions.length} entries
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-1">
                {/* Back button */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
                  disabled={activePage === 1}
                  className="p-2 border border-stone-200 dark:border-stone-800 rounded-lg bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-850 disabled:opacity-40 transition text-stone-500 dark:text-stone-400"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  // Only display surrounding pages to prevent overflow when there are many pages
                  if (
                    totalPages > 5 &&
                    pageNum !== 1 &&
                    pageNum !== totalPages &&
                    Math.abs(activePage - pageNum) > 1
                  ) {
                    // Render ellipses
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={pageNum} className="px-2 text-stone-400">...</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        activePage === pageNum
                          ? 'bg-emerald-850 dark:bg-emerald-800 text-white'
                          : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-850 border dark:border-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next button */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, activePage + 1))}
                  disabled={activePage === totalPages}
                  className="p-2 border border-stone-200 dark:border-stone-800 rounded-lg bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-850 disabled:opacity-40 transition text-stone-500 dark:text-stone-400"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* SUBMISSION MESSAGE VIEW DETAIL MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedSub(null)}
          />
          <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 dark:from-emerald-900 dark:to-stone-950 text-white p-6 relative">
              <button
                onClick={() => setSelectedSub(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-base">Submission Details</h4>
                  <p className="text-emerald-300 dark:text-emerald-400 text-[10px]">Record ID: #{selectedSub.id}</p>
                </div>
              </div>
            </div>

            {/* Modal Details Grid Content */}
            <div className="p-6 space-y-5 overflow-y-auto text-stone-700 dark:text-stone-300 text-xs">
              <div className="grid grid-cols-2 gap-4 border-b dark:border-stone-850 pb-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">Full Name</span>
                  <span className="font-bold text-stone-900 dark:text-white text-sm">{selectedSub.name}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-405 font-bold font-mono">Email Address</span>
                  <a href={`mailto:${selectedSub.email}`} className="text-emerald-700 dark:text-emerald-450 hover:underline font-medium text-sm">{selectedSub.email}</a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b dark:border-stone-850 pb-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">Submission Type</span>
                  <span className="capitalize font-semibold">{selectedSub.type}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">Received Date</span>
                  <span>{formatDate(selectedSub.created_at)}</span>
                </div>
              </div>

              {/* Conditional parameters based on type */}
              {selectedSub.type === 'booking' && (
                <div className="grid grid-cols-2 gap-4 border-b dark:border-stone-850 pb-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">Scheduled Visit Date</span>
                    <span className="font-bold text-stone-850 dark:text-white">{selectedSub.date}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">Total Guest Count</span>
                    <span className="font-bold text-stone-850 dark:text-white">{selectedSub.guests}</span>
                  </div>
                </div>
              )}

              {selectedSub.type === 'donation' && (
                <div className="grid grid-cols-1 gap-4 border-b dark:border-stone-850 pb-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">Pledge Donation Amount</span>
                    <span className="font-extrabold text-sm text-purple-750 dark:text-purple-400">
                      Rs. {parseFloat(selectedSub.amount || '0').toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Message Block */}
              <div className="space-y-1">
                <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-bold font-mono">
                  {selectedSub.type === 'volunteer' ? 'How they can help / Message' : 'Submission Message / Notes'}
                </span>
                <p className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border dark:border-stone-850 text-stone-800 dark:text-stone-250 leading-relaxed font-light whitespace-pre-wrap">
                  {selectedSub.message || <span className="italic text-stone-400 font-light">No message provided.</span>}
                </p>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="bg-stone-50 dark:bg-stone-950 border-t dark:border-stone-850 p-4 flex justify-between">
              {/* Trigger Delete directly from details page */}
              <button
                onClick={() => setSubToDelete(selectedSub)}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/35 text-red-650 dark:text-red-400 font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete Record
              </button>

              <button
                onClick={() => setSelectedSub(null)}
                className="bg-stone-900 hover:bg-stone-850 dark:bg-stone-800 dark:hover:bg-stone-750 text-white font-semibold px-4 py-2 rounded-xl"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {subToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSubToDelete(null)}
          />
          <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl w-full max-w-sm shadow-2xl p-6 overflow-hidden z-10 space-y-4 animate-scaleUp">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 dark:text-white text-base">Delete Submission?</h4>
                <p className="text-stone-500 dark:text-stone-400 text-xs font-light leading-relaxed">
                  Are you sure you want to delete **{subToDelete.name}**&apos;s submission? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-end border-t dark:border-stone-850 pt-4">
              <button
                onClick={() => setSubToDelete(null)}
                disabled={isDeleting}
                className="bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 font-semibold px-4 py-2 rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSubmission(subToDelete.id)}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
