import React from 'react'
import { render, fireEvent } from '@testing-library/react'
//render and fireEvent are provided to us by the React testing library.  The functionality of these will become clear further down.
import Header from '../components/Header'
//We need to import the component that we want to test

it('Does not show dropdown when mounted', () => {
  const { queryByTestId } = render(<Header />)

  const dropdown = queryByTestId('dropdown')

  expect(dropdown).not.toBeTruthy()
})

it('Shows dropdown when hamburger is clicked', () => {
  const { container, getByTestId } = render(<Header />)

  const hamburger = getByTestId('hamburger-button')

  fireEvent.click(hamburger)

  expect(container.textContent).toContain('Dropdown menu')
})
