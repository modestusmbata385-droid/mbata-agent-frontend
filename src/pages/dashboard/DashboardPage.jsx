import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import LoadingState from '../../components/LoadingState.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import ErrorState from '../../components/ErrorState.jsx';

export default function DashboardPage() {
  const [status, setStatus] = useState('loading'); // loading | empty | error | ready
  const [finance, setFinance] = useState(null);

  const load = useCallback(() => {
    setStatus('loading');
    api.get('/finance/dashboard')
      .then((res) => {
        setFinance(res.data);
        setStatus('ready');
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setStatus('empty'); // no finance profile yet — Section 9's gate, not an error
        } else {
          setStatus('error');
        }
      });
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <section>
      <h1>Dashboard</h1>

      {status === 'loading' && <LoadingState label="Loading your dashboard" />}

      {status === 'empty' && (
        <EmptyState
          message="No finance profile yet."
          actionLabel="Create Finance Profile"
          onAction={() => api.post('/profiles', { profileType: 'finance' }).then(load)}
        />
      )}

      {status === 'error' && <ErrorState onRetry={load} />}

      {status === 'ready' && finance && (
        <ul>
          <li>Balance: {finance.balance}</li>
          <li>Confirmed income: {finance.confirmedIncome}</li>
          <li>Confirmed expenses: {finance.confirmedExpenses}</li>
        </ul>
      )}
    </section>
  );
}
