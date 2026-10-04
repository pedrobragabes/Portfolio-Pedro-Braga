# Fontes e PDFs dos currículos

Os PDFs fornecidos por Pedro na PR #16, em setembro de 2026, estavam mais atuais que as fontes locais e as fontes do repositório Resume. As fontes foram reconstruídas a partir desses PDFs, mantendo o conteúdo profissional e os destinos dos links de contato.

Nesta revisão, os dois PDFs publicados usam as fontes atuais do repositório [Resume](https://github.com/pedrobragabes/Resume/pull/2), com uma página A4 por idioma, margens consistentes e texto selecionável. LinkedIn e GitHub usam rótulos curtos no cabeçalho; o telefone português passa a incluir +55, como o inglês. Nenhum cargo, data, resultado ou métrica foi acrescentado.

Ambos foram compilados com pdfLaTeX 2026 já instalado, renderizados e revisados visualmente, sem sobreposição/corte. Cinco links por PDF foram conferidos. Do resumo até a última seção, o texto coincide com os PDFs de setembro, desconsiderando espaços, pontuação e caixa.

| Arquivo | SHA-256 nesta revisão |
| --- | --- |
| `CV_Pedro_Braga_Software_Engineer.pdf` | `a67d07400886c0debe66d73642ceb25decdabf4cf495fc35e9d8f8d0f94de6d7` |
| `Resume_Pedro_Braga_Software_Engineer.pdf` | `e9057f72d40c6cf51b8d33c52c3cecc677a6d6df6b270700783b134beeec6889` |

O editor nativo permanece disponível para editar as fontes, mas seu compilador retornou erro de diretórios da plataforma nesta execução; a exportação foi comprovada no compilador existente. A publicação exige o workflow Hostinger aprovado e a conferência dos hashes dos dois PDFs públicos.
