// Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/pagination';
// import { Pagination } from '../Pagination';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const setup = (currentPage: number, totalPages: number, onPageChange = vi.fn()) => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);
    return { onPageChange };
  };

  it('renders all pages when totalPages <= 7', () => {
    setup(1, 5);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('button', { name: String(i) })).toBeInTheDocument();
    }

    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('renders ellipsis correctly when totalPages > 7 and currentPage is near start', () => {
    setup(2, 10);
    expect(screen.getAllByText('...')).toHaveLength(1);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders ellipsis correctly when currentPage is in the middle', () => {
    setup(5, 10);
    expect(screen.getAllByText('...')).toHaveLength(2);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables "Previous" button on first page', () => {
    setup(1, 10);
    expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled();
  });

  it('disables "Next" button on last page', () => {
    setup(10, 10);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('calls onPageChange with correct value when a page number is clicked', () => {
    const { onPageChange } = setup(1, 10);
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with currentPage - 1 when Previous is clicked', () => {
    const { onPageChange } = setup(3, 10);
    fireEvent.click(screen.getByRole('button', { name: /Previous/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when Next is clicked', () => {
    const { onPageChange } = setup(3, 10);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('highlights the current page correctly', () => {
    setup(4, 10);
    const currentPageBtn = screen.getByRole('button', { name: '4' });
    expect(currentPageBtn).toHaveAttribute('aria-current', 'page');
    expect(currentPageBtn).toHaveClass('bg-violet-100');
  });
});
