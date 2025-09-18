"use client";
import { motion } from "framer-motion";
import { Database, Clock, ExternalLink } from "lucide-react";

const availableModels = [
  {
    id: 1,
    name: "Civil Registry & Identity Model",
    nameLocal: "Registo Civil",
    datasets: [
      {
        name: "Birth Certificate RDTL",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Civil+Registry+%26+Identity+Model/CERTIDA%CC%83O+NASCIMENTO+RDTL.pdf",
      },
    ],
  },
  {
    id: 2,
    name: "Immigration & Travel Model",
    nameLocal: "Imigração e Viagens",
    datasets: [
      {
        name: "Common Passport",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Immigration+%26+Travel+Model/PASSAPORTE+KOMUM.pdf",
      },
      {
        name: "Passport Process",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Immigration+%26+Travel+Model/THE+PROCESS+FOR+PASSPORT.txt",
      },
      {
        name: "Law 11-2017 LIA",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Immigration+%26+Travel+Model/Lei+11-2017+LIA+com+Indice.pdf",
      },
    ],
  },
  {
    id: 4,
    name: "Business & Commerce Model",
    nameLocal: "Negócios e Comércio",
    datasets: [
      {
        name: "Ministerial Diploma 33-2023",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Business+%26+Commerce+Model/1_DIPLOMA-MINISTERIAL-N-33-2023-DECLARACAO-PREVIA-EM-PORTUGUES-E-INGLES_1-COM-ANEXOS-I_II_III.pdf",
      },
      {
        name: "FAQ's serve.gov.tl",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Business+%26+Commerce+Model/FAQ's+https-%3Aserve.gov.tl.pdf",
      },
    ],
  },
  {
    id: 5,
    name: "Legal & Constitutional Model",
    nameLocal: "Jurídico e Constitucional",
    datasets: [
      {
        name: "Law 11-2017 LIA",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Immigration+%26+Travel+Model/Lei+11-2017+LIA+com+Indice.pdf",
      },
      {
        name: "RDTL Constitution (English)",
        url: "https://ajuda-digital.s3.us-east-1.amazonaws.com/Legal+%26+Constitutional+Model/Constitution_RDTL_ENG.pdf",
      },
    ],
  },
];

const upcomingModels = [
  "Education Model (Educação)",
  "Elections & Civic Participation (Eleições e Participação Cívica)",
  "Health & Social Services (Saúde e Serviços Sociais)",
  "Finance & Taxation (Finanças e Tributação)",
  "Land & Property (Terras e Propriedade)",
  "Employment & Labor (Emprego e Trabalho)",
];

export default function DatasetsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8">
              <Database className="text-white" size={40} />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Dataset for RAG for{" "}
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                Ajuda Digital
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Currently we have 4 available models with datasets collected from
              government websites and official documents. More models are being
              developed with government support.
            </p>

            {/* Challenges Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Current Challenges & Context
              </h3>
              <div className="space-y-4 text-left">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    🏛️ Limited Government Data Access
                  </h4>
                  <p className="text-gray-700">
                    Access to government data is challenging and very difficult
                    to obtain. We're working with limited resources and facing
                    bureaucratic barriers in accessing comprehensive official
                    datasets.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    ⏰ Time Constraints
                  </h4>
                  <p className="text-gray-700">
                    Due to time limitations, we've had to collect data from
                    various sources including website screenshots, tech pictures
                    on boards, and whatever government documents we could
                    download publicly.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    🚀 Hackathon Initiative Impact
                  </h4>
                  <p className="text-gray-700">
                    We believe this hackathon and our initiative will
                    demonstrate the value of our product to the government,
                    potentially leading to official support and better access to
                    comprehensive datasets in the future.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    📊 Current Data Sources
                  </h4>
                  <p className="text-gray-700">
                    Our current datasets come from a mix of sources: publicly
                    available government documents, official PDFs from
                    government websites, process documentation, and legal texts
                    that we've been able to access.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Available Models */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Available Models
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {availableModels.map((model) => (
                <div
                  key={model.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                      <Database className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {model.name}
                      </h3>
                      <p className="text-gray-600">{model.nameLocal}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">
                      Available Datasets:
                    </h4>
                    {model.datasets.map((dataset, index) => (
                      <a
                        key={index}
                        href={dataset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-700">{dataset.name}</span>
                        <ExternalLink className="text-blue-500" size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Models */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-12 border border-yellow-200"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
                <Clock className="text-white animate-pulse" size={32} />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Models
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
                The following models are currently in development and will be
                available soon:
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {upcomingModels.map((model, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 rounded-lg p-4 text-center"
                >
                  <p className="text-gray-800 font-medium">{model}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-medium">
                <Clock size={20} />
                <span>Coming Soon</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-12 border border-yellow-200"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
                <Clock className="text-white animate-pulse" size={32} />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Models
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
                The following models are currently in development and will be
                available soon:
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {upcomingModels.map((model, index) => (
                <div
                  key={index}
                  className="bg-yellow-100 rounded-lg p-4 text-center"
                >
                  <p className="text-gray-800 font-medium">{model}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-medium">
                <Clock size={20} />
                <span>Coming Soon</span>
              </div>
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid gap-8 md:grid-cols-2"
          >
            {/* Complete Dataset Reference */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                  <Database className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Complete Dataset Reference
                </h3>
                <p className="text-gray-700 mb-6">
                  Access our comprehensive spreadsheet with all collected data
                  sources and additional resources
                </p>
                <a
                  href="https://docs.google.com/spreadsheets/d/1EGKSp_Esu_Da2PGWB6uPPccFprneUB_DQNOBhxr0Y7Q/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>View Complete Dataset</span>
                </a>
              </div>
            </div>

            {/* Data Collection Form */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4">
                  <ExternalLink className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Help Us Collect Data
                </h3>
                <p className="text-gray-700 mb-6">
                  Join our community effort to improve Ajuda Digital by
                  contributing valuable government data and resources
                </p>
                <a
                  href="https://forms.gle/XEhRq9EVTcCBWCh1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Contribute Data</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
