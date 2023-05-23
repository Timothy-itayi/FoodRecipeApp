import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface GridFormProps {
  selected: boolean
}

interface RadioLabelProps {
  selected: boolean
}

export const GridForm = styled.form`
  width: 70%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
`

export const ColOne = styled.label`
  grid-column: 1;
`

export const ColTwoText = styled.input`
  grid-column: 2;
`

export const ColTwoField = styled.fieldset`
  grid-column: 2;
  border: none;
  display: flex;
  flex-wrap: wrap;
`

export const Button = styled.button`
  grid-column: 2;
  width: 50%;
`

export const ErrorMessage = styled.div`
  color: red;
  cursor: pointer;
`

export const RadioLabel = styled.label<RadioLabelProps>`
  padding: 5px;
  ${(props) =>
    props.selected &&
    `
    border-radius: 15%;
    background-color: grey;
  `}
`

export const Radio = styled.input.attrs({ type: 'radio' })`
  display: none;
`

export const NavGroup = styled.nav`
  float: right;
`

export const NavLink = styled(Link)`
  margin-right: 30px;
`

export const NavButton = styled.button`
  margin-right: 30px;
`
