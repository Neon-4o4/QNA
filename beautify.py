import os
import sys
from bs4 import BeautifulSoup

def beautify_html(filepath):
    with open(filepath, 'r') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Update sidebar
    sidebar = soup.find('aside', {'id': 'sidebar'})
    if sidebar:
        part1_link = sidebar.find('a', href='part1.html')
        if part1_link and part1_link.parent.name == 'li':
            part1_li = part1_link.parent
            part1_li.name = 'li'
            part1_li.attrs = {'class': 'py-2 px-4 font-bold'}
            part1_li.string = 'Part I: Computer Fundamentals'
            if part1_li.a:
                part1_li.a.unwrap()

        part2_link = sidebar.find('a', href='part2.html')
        if part2_link and part2_link.parent.name == 'li':
            part2_li = part2_link.parent
            part2_li.name = 'li'
            part2_li.attrs = {'class': 'py-2 px-4 font-bold'}
            part2_li.string = 'Part II: Programming with C/C++'
            if part2_li.a:
                part2_li.a.unwrap()

    section = soup.find('section')
    if section:
        h3 = section.find('h3')
        if h3 and 'text-2xl' not in h3.get('class', []):
            h3['class'] = "text-2xl font-bold mb-8"

        articles = section.find_all('article')
        for article in articles:
            if 'bg-white' not in article.get('class', []):
                article['class'] = 'bg-white p-6 rounded-lg shadow-md mb-6'

                h4 = article.find('h4')
                if h4:
                    h4['class'] = 'text-lg font-bold mb-4'

                # Check if a div with the target class already exists
                if not article.find('div', class_='text-gray-700'):
                    content_children = [child for child in article.children if child != h4 and child.name is not None]

                    div = soup.new_tag('div')
                    div['class'] = 'text-gray-700'

                    for child in content_children:
                        div.append(child.extract())

                    article.append(div)

                # Apply styles to elements within the (now existing) div
                div = article.find('div', class_='text-gray-700')
                if div:
                    for h5 in div.find_all('h5'):
                        h5['class'] = 'font-semibold mt-4'
                    for ol in div.find_all('ol'):
                        ol['class'] = 'list-decimal list-inside'
                    for ul in div.find_all('ul'):
                        ul['class'] = 'list-disc list-inside ml-4'
                    for pre in div.find_all('pre'):
                        pre['class'] = 'bg-gray-200 p-4 rounded-md'

    with open(filepath, 'w') as f:
        f.write(str(soup.prettify()))

if __name__ == '__main__':
    filepath = sys.argv[1]
    beautify_html(filepath)
