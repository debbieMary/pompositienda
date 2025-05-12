import React from 'react'
import CustomBorder from './CustomBorder';
import ButtonLink from './ButtonLink';
import { FaListAlt, FaBan } from "react-icons/fa";

export default function EmptyData({titulo, buttonLabel, to}) {
  return (
    <CustomBorder><h2 className="text-plomo mb-4"><FaBan size={40} className='text-secondary'/> {titulo}</h2>
    <ButtonLink to={to}>{buttonLabel}</ButtonLink>
    </CustomBorder>
  )
}
