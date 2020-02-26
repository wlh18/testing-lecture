import React from 'react'
import { render, act } from '@testing-library/react'
import axios from 'axios'
import Todos from '../Components/Todos'

it('Renders todos', async () => {
  let component
  //Initializes a variable for us to test later.

  jest
    .spyOn(axios, 'get')
    //spyOn watches the axios object and tracks any calls to the get method
    .mockImplementation(() =>
      //mockImplementation intercepts those calls and replaces the functionality with what I say.
      Promise.resolve({ data: [{ id: 1, title: 'test title' }] })
    )

  await act(async () => {
    const { container } = render(<Todos />)
    component = container
    //Grabs the dom container from the Todos component and reassigns it to the component variable
  })

  expect(component.textContent).toContain('test title')
})
