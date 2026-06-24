import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderApp = () => {
  const testQueryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

test('renders TODO App heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  renderApp();

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('deletes a todo item', async () => {
  const user = userEvent.setup();

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: 'Buy milk', completed: false }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

  renderApp();

  expect(await screen.findByText('Buy milk')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /delete todo buy milk/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'DELETE',
    });
  });

  await waitFor(() => {
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  });
});

test('calculates stats from todos', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
        { id: 3, title: 'Todo 3', completed: false },
      ],
    })
  );

  renderApp();

  expect(await screen.findByText('2 items left')).toBeInTheDocument();
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('shows empty state when no todos exist', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => [],
    })
  );

  renderApp();

  expect(await screen.findByText(/no todos yet/i)).toBeInTheDocument();
});

test('shows an error message when todos query fails', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: async () => ({ error: 'server error' }),
    })
  );

  renderApp();

  expect(await screen.findByText(/could not load todos/i)).toBeInTheDocument();
});

test('edits a todo title and saves it', async () => {
  const user = userEvent.setup();

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: 'Old title', completed: false }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, title: 'New title', completed: false }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: 'New title', completed: false }],
    });

  renderApp();

  expect(await screen.findByText('Old title')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /edit todo old title/i }));

  const editInput = await screen.findByDisplayValue('Old title');
  await user.clear(editInput);
  await user.type(editInput, 'New title');

  await user.click(screen.getByRole('button', { name: /save todo changes/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New title' }),
    });
  });

  expect(await screen.findByText('New title')).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
