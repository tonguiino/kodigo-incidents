import React from 'react'
import { ModalGenerate } from './ModalGenerate'


const Header = () => {
    return (
        <>
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 text-white rounded-lg aspect-square bg-brand">
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">Kódigo Fuente</h1>
                    <span className="text-xl font-light text-brand">| Soporte POS</span>
                </div>
            </div>
            <div>
                <ModalGenerate/>
            </div>
        </header>
        </>
    )
}

export default Header