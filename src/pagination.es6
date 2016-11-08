/**
 * @package     JS
 *
 * @version     2.0.0
 * @copyright   Copyright (C) 2016 ETD Solutions. Tous droits réservés.
 * @license     Apache-2.0
 * @author      ETD Solutions http://etd-solutions.com
 */

class Pagination {

    viewall;
    total;
    start;
    limit;
    pagesTotal;
    pagesCurrent;
    pagesStart;
    pagesStop;
    displayedPages;

    constructor(start, limit) {
        this.start = start;
        this.limit = limit;
    }

    update(total, start, limit) {

        // Initialisation.
        var viewall      = false;
        var pagesCurrent = 0;
        var pagesTotal   = 0;

        start = Math.max(start, 0);
        limit = Math.max(limit, 0);

        if (limit > total) {
            start = 0;
        }

        if (!limit) {
            limit = total;
            start = 0;
        }

        /*
         * Si start est plus grand que le total (i.e. on demande à afficher des enregistrments qui n'existent pas)
         * alors on définit start pour afficher la dernière page naturelle des enregistrements
         */
        if (start > total - limit) {
            start = Math.max(0, (Math.ceil(total / limit) - 1) * limit);
        }

        // On définit le nombre total de pages et les valeurs de la page courante.
        if (limit > 0) {
            pagesTotal   = Math.ceil(total / limit);
            pagesCurrent = Math.ceil((start + 1) / limit);
        }

        // On définit les valeurs de la boucle d'itération de la pagination.
        var displayedPages = 10;
        var pagesStart     = pagesCurrent - (displayedPages / 2);
        var pagesStop;

        if (pagesStart < 1) {
            pagesStart = 1;
        }

        if (pagesStart + displayedPages > pagesTotal) {
            pagesStop = pagesTotal;

            if (pagesTotal < displayedPages) {
                pagesStart = 1;
            } else {
                pagesStart = pagesTotal - displayedPages + 1;
            }
        } else {
            pagesStop = pagesStart + displayedPages - 1;
        }

        // Si on affiche tous les enregistrements, on passe le drapeau à true.
        if (limit == 0) {
            viewall = true;
        }

        this.viewall        = viewall;
        this.total          = total;
        this.start          = start;
        this.limit          = limit;
        this.pagesTotal     = pagesTotal;
        this.pagesCurrent   = pagesCurrent;
        this.pagesStart     = pagesStart;
        this.pagesStop      = pagesStop;
        this.displayedPages = displayedPages;
    }

}

export default Pagination;
