'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FileSpreadsheet, Upload, CheckCircle2, ShieldAlert, ArrowRight, Table, AlertTriangle, Loader2 } from 'lucide-react'

export default function CsvImportPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvContent, setCsvContent] = useState<string[][]>([])
  const [step, setStep] = useState(1) // 1: Select file, 2: Map columns & preview, 3: Success
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Target database fields
  const dbFields = [
    { name: 'first_name', label: 'Prénom (first_name) *' },
    { name: 'last_name', label: 'Nom (last_name) *' },
    { name: 'stage_name', label: 'Nom de scène (stage_name)' },
    { name: 'category', label: 'Catégorie (category_name) *' },
    { name: 'film_title', label: 'Film (film_title)' },
    { name: 'country', label: 'Pays (country_id)' }
  ]

  // Mapping state: key is CSV Column Index, value is DB field name
  const [mappings, setMappings] = useState<Record<number, string>>({})

  // Handle CSV file selection and parsing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      setError('Veuillez sélectionner un fichier CSV valide.')
      return
    }

    setCsvFile(file)
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      // Simple parse lines and columns (comma or semicolon split)
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '')
      if (lines.length === 0) {
        setError('Le fichier CSV est vide.')
        return
      }

      const separator = lines[0].includes(';') ? ';' : ','
      const rows = lines.map(line => line.split(separator).map(cell => cell.trim().replace(/^"|"$/g, '')))
      
      setCsvContent(rows)
      
      // Auto map default matching header names
      const headers = rows[0]
      const initialMappings: Record<number, string> = {}
      headers.forEach((header, idx) => {
        const lowerHeader = header.toLowerCase()
        if (lowerHeader.includes('prenom') || lowerHeader.includes('first_name')) {
          initialMappings[idx] = 'first_name'
        } else if (lowerHeader.includes('nom') || lowerHeader.includes('last_name')) {
          initialMappings[idx] = 'last_name'
        } else if (lowerHeader.includes('scene') || lowerHeader.includes('stage_name')) {
          initialMappings[idx] = 'stage_name'
        } else if (lowerHeader.includes('categorie') || lowerHeader.includes('category')) {
          initialMappings[idx] = 'category'
        } else if (lowerHeader.includes('film')) {
          initialMappings[idx] = 'film_title'
        } else if (lowerHeader.includes('pays') || lowerHeader.includes('country')) {
          initialMappings[idx] = 'country'
        }
      })
      setMappings(initialMappings)
      setStep(2)
    }
    reader.readAsText(file)
  }

  const handleMappingChange = (colIdx: number, fieldName: string) => {
    setMappings(prev => {
      const updated = { ...prev }
      if (fieldName === 'none') {
        delete updated[colIdx]
      } else {
        updated[colIdx] = fieldName
      }
      return updated
    })
  }

  // Handle final import save
  const handleImportSave = async () => {
    // Validate mapping contains required fields: first_name, last_name, category
    const mappedFields = Object.values(mappings)
    const hasFirstName = mappedFields.includes('first_name')
    const hasLastName = mappedFields.includes('last_name')
    const hasCategory = mappedFields.includes('category')

    if (!hasFirstName || !hasLastName || !hasCategory) {
      setError('Veuillez associer les champs obligatoires (*) : Prénom, Nom et Catégorie.');
      return
    }

    setIsProcessing(true)
    setError(null)

    // Simulate import processing and DB writes
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setStep(3)
  }

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-tight mb-1">
          Importation CSV
        </h1>
        <p className="text-xs text-gray-text uppercase tracking-widest">
          Importer massivement des nominés, films et catégories
        </p>
      </div>

      {error && (
        <div className="bg-bordeaux/20 border border-bordeaux/50 rounded-2xl p-4 flex gap-3 text-xs text-ivory">
          <ShieldAlert size={18} className="shrink-0 text-bordeaux" />
          <span>{error}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 1: SELECT FILE
         ------------------------------------------------------------------- */}
      {step === 1 && (
        <div className="bg-dark-surface border border-border-color rounded-3xl p-8 text-center flex flex-col items-center gap-6 shadow-xl">
          <div className="p-4 rounded-2xl bg-gold-primary/10 text-gold-light">
            <FileSpreadsheet size={32} />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-ivory mb-2">Sélectionnez le fichier CSV</h2>
            <p className="text-xs text-gray-text max-w-sm mx-auto leading-relaxed">
              Le fichier doit contenir au minimum les colonnes pour le prénom, le nom et la catégorie de nomination.
            </p>
          </div>

          <label className="cursor-pointer">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="bg-gold-primary hover:bg-gold-light text-dark-bg text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full flex items-center gap-2 shadow-lg transition-colors">
              <Upload size={16} />
              <span>Choisir un fichier</span>
            </div>
          </label>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 2: MAP COLUMNS & PREVIEW
         ------------------------------------------------------------------- */}
      {step === 2 && (
        <div className="flex flex-col gap-8">
          {/* Mappings */}
          <div className="bg-dark-surface border border-border-color rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
            <h2 className="font-serif text-base font-bold text-ivory uppercase tracking-wider border-b border-border-color pb-3 flex items-center gap-2">
              <ArrowRight size={16} className="text-gold-light" />
              Associer les colonnes du CSV aux champs de la Base
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {csvContent[0]?.map((header, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-2 bg-dark-bg/60 border border-border-color/40 p-4 rounded-2xl">
                  <span className="text-[10px] text-gray-text uppercase font-bold tracking-wider">
                    Colonne CSV ({colIdx + 1}) :
                  </span>
                  <span className="text-sm font-bold text-gold-light truncate mb-2">{header}</span>
                  
                  <select
                    value={mappings[colIdx] || 'none'}
                    onChange={(e) => handleMappingChange(colIdx, e.target.value)}
                    className="bg-dark-surface border border-border-color text-xs font-semibold py-2 px-3 rounded-xl text-ivory focus:outline-none cursor-pointer"
                  >
                    <option value="none">-- Ignorer cette colonne --</option>
                    {dbFields.map((field) => (
                      <option key={field.name} value={field.name}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Table */}
          <div className="bg-dark-surface border border-border-color rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
            <h2 className="font-serif text-base font-bold text-ivory uppercase tracking-wider border-b border-border-color pb-3 flex items-center gap-2">
              <Table size={16} className="text-gold-light" />
              Aperçu des données à importer
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-text">
                <thead className="bg-dark-bg text-ivory uppercase text-[10px] tracking-wider">
                  <tr>
                    {csvContent[0]?.map((header, idx) => (
                      <th key={idx} className="px-4 py-3 font-semibold border-b border-border-color/60">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvContent.slice(1, 4).map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-border-color/40 hover:bg-dark-bg/30">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {csvContent.length > 4 && (
              <p className="text-[10px] text-gray-text italic text-center">
                + {csvContent.length - 4} autres lignes à importer.
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="flex gap-4 justify-end">
            <Button variant="secondary" onClick={() => setStep(1)} className="uppercase tracking-widest text-xs py-3 px-8">
              Annuler
            </Button>
            <Button variant="gold" onClick={handleImportSave} disabled={isProcessing} className="uppercase tracking-widest text-xs py-3 px-8 flex items-center gap-2">
              {isProcessing && <Loader2 size={14} className="animate-spin" />}
              {isProcessing ? 'Importation en cours...' : 'Confirmer l\'importation'}
            </Button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 3: SUCCESS
         ------------------------------------------------------------------- */}
      {step === 3 && (
        <div className="bg-dark-surface border border-border-color rounded-3xl p-8 text-center flex flex-col items-center gap-6 shadow-xl max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-gold-primary/10 text-gold-light flex items-center justify-center animate-bounce">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-ivory mb-2">Importation terminée</h2>
            <p className="text-xs text-gray-text leading-relaxed">
              Les données de {csvContent.length - 1} nominés et films ont été validées et importées avec succès dans la base de données.
            </p>
          </div>

          <Button variant="outline" onClick={() => setStep(1)} className="uppercase tracking-widest text-[10px]">
            Faire un autre import
          </Button>
        </div>
      )}
    </div>
  )
}
