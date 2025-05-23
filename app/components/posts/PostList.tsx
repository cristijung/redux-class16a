"use client";

import { useState } from "react";
import { useGetPostsQuery, useGetPostByIdQuery } from "../../store/postsApi";
import { FiChevronDown, FiChevronUp, FiRefreshCw, FiXCircle, FiLoader, FiAlertTriangle, FiList, FiEyeOff, FiCheckCircle } from 'react-icons/fi'; // Exemplo de ícones

export default function PostList() {
  const [showList, setShowList] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const {
    data: posts,
    error: postsError,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    refetch: refetchPosts,
  } = useGetPostsQuery(undefined, {
    // skip: !showList, // Descomente para pular a query se a lista não estiver visível
  });

  const {
    data: selectedPost,
    isLoading: isLoadingPost,
    isFetching: isFetchingPost,
  } = useGetPostByIdQuery(selectedPostId!, {
    skip: selectedPostId === null,
  });

  const toggleList = () => {
    setShowList((prev) => !prev);
    if (showList) { // Se a lista estava visível e será escondida
      setSelectedPostId(null); // Limpa a seleção
    }
  };

  const commonButtonStyles = "px-4 py-2 text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center space-x-2";
  const primaryButtonStyles = `${commonButtonStyles} text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`;
  const secondaryButtonStyles = `${commonButtonStyles} text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-500`;
  const refreshButtonStyles = `${commonButtonStyles} text-white bg-green-500 hover:bg-green-600 focus:ring-green-400 disabled:bg-gray-400 disabled:cursor-not-allowed`;
  const clearButtonStyles = `${commonButtonStyles} text-gray-700 bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300`;

  if (!showList) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl space-y-4 text-center">
        <FiEyeOff className="text-5xl text-indigo-500 dark:text-indigo-400 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Lista de Posts Oculta</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          A lista de posts está oculta. O cache de <code className="px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded text-xs">getPosts</code> (com{" "}
          <code className="px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded text-xs">keepUnusedDataFor: 30</code>) será limpo após 30s de inatividade.
        </p>
        <button
          onClick={toggleList}
          className={primaryButtonStyles}
        >
          <FiList />
          <span>Mostrar Lista de Posts</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight">
          Painel de Posts Interativo
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Explore e gerencie posts com cache RTK Query.
        </p>
      </header>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="flex space-x-3">
          <button
            onClick={toggleList}
            className={secondaryButtonStyles}
          >
            {showList ? <FiChevronUp /> : <FiChevronDown />}
            <span>Esconder Lista</span>
          </button>
          <button
            onClick={() => refetchPosts()}
            disabled={isFetchingPosts}
            className={refreshButtonStyles}
          >
            {isFetchingPosts ? <FiLoader className="animate-spin" /> : <FiRefreshCw />}
            <span>{isFetchingPosts ? "Atualizando..." : "Atualizar Lista"}</span>
          </button>
        </div>
      </div>

      {isLoadingPosts && (
        <div className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow text-indigo-600 dark:text-indigo-400">
          <FiLoader className="animate-spin text-3xl mr-3" />
          <p className="text-lg font-medium">Carregando posts...</p>
        </div>
      )}

      {postsError && (
         <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 shadow" role="alert">
          <div className="flex items-center">
            <FiAlertTriangle className="text-xl mr-2"/>
            <span className="font-medium">Erro ao carregar posts!</span> Por favor, tente novamente.
          </div>
        </div>
      )}

      {posts && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b dark:border-slate-700 pb-2">Disponíveis ({posts.slice(0,10).length})</h2>
            <ul className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 custom-scrollbar">
              {posts.slice(0, 10).map((post) => (
                <li
                  key={post.id}
                  onClick={() => setSelectedPostId(post.id)}
                  className={`p-4 border dark:border-slate-700 rounded-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md
                    ${ selectedPostId === post.id
                        ? "bg-indigo-100 dark:bg-indigo-700 border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500 dark:ring-indigo-400"
                        : "bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-600/50 border-gray-200"
                    }`}
                >
                  <h3 className={`text-md font-semibold ${selectedPostId === post.id ? 'text-indigo-800 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                    {post.title}
                  </h3>
                </li>
              ))}
            </ul>
          </div>

          <div className="sticky top-6">
            {selectedPostId !== null && (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl animate-fadeIn">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                    Detalhes do Post
                  </h2>
                  <span className="px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 dark:bg-indigo-600 dark:text-indigo-100 rounded-full">
                    ID: {selectedPostId}
                  </span>
                </div>

                {isLoadingPost && (
                  <div className="flex items-center justify-center p-4 text-indigo-600 dark:text-indigo-400">
                    <FiLoader className="animate-spin text-2xl mr-2" />
                    <p>Carregando post selecionado...</p>
                  </div>
                )}
                {selectedPost && (
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{selectedPost.title}</h3>
                    <p className="text-sm leading-relaxed">{selectedPost.body}</p>
                  </div>
                )}
                <button
                  onClick={() => setSelectedPostId(null)}
                  className={`${clearButtonStyles} mt-6 w-full`}
                >
                  <FiXCircle />
                  <span>Limpar Seleção</span>
                </button>
              </div>
            )}
             {selectedPostId === null && !isLoadingPosts && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl text-center animate-fadeIn">
                    <FiCheckCircle className="text-5xl text-green-500 dark:text-green-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Selecione um Post</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Clique em um post da lista para ver seus detalhes aqui.</p>
                </div>
             )}
          </div>
        </div>
      )}


      <footer className="mt-10 p-4 bg-slate-100 dark:bg-slate-800 border-t dark:border-slate-700 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Informações de Cache e Status:</h3>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>
                <strong className="font-medium text-gray-700 dark:text-gray-300">Status (Lista):</strong>
                isLoading: <span className={`font-mono px-1.5 py-0.5 rounded ${isLoadingPosts ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{String(isLoadingPosts)}</span>,
                isFetching: <span className={`font-mono px-1.5 py-0.5 rounded ${isFetchingPosts ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{String(isFetchingPosts)}</span>
            </p>
            <p>
                <strong className="font-medium text-gray-700 dark:text-gray-300">Status (Post Único):</strong>
                isLoading: <span className={`font-mono px-1.5 py-0.5 rounded ${isLoadingPost ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{String(isLoadingPost)}</span>,
                isFetching: <span className={`font-mono px-1.5 py-0.5 rounded ${isFetchingPost ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{String(isFetchingPost)}</span>
            </p>
            <p className="mt-1">
                <code className="px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded">getPosts</code> usa <code className="px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded">keepUnusedDataFor: 30</code> (cache de 30s após desmontar).
            </p>
            <p>
                <code className="px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded">getPostById</code> usa 60s por padrão.
            </p>
        </div>
      </footer>

      {/* Estilos para scrollbar customizada e animações (opcional) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; // coolGray-300
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; // coolGray-400
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563; // gray-600
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280; // gray-500
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}