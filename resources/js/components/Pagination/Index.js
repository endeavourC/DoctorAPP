import React, { useReducer, useEffect } from "react";
import {
    MDBPagination,
    MDBPageItem,
    MDBPageNav,
    MDBCol,
    MDBRow
} from "mdbreact";
import {
    SET_CURRENT_PAGE,
    ADD_PAGE_LENGTH,
    RESET_PAGE_LENGTH,
    NEXT_PAGE,
    PREV_PAGE
} from "../../data/constants/pagination.constants";
const initialState = {
    pages: [],
    current_page: 1
};

const pageReducer = (state, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                current_page: action.payload
            };
        case ADD_PAGE_LENGTH:
            return {
                ...state,
                pages: [...state.pages, action.payload]
            };
        case RESET_PAGE_LENGTH:
            return {
                ...state,
                pages: []
            };
        case NEXT_PAGE:
            return {
                ...state,
                current_page: state.current_page + 1
            };
        case PREV_PAGE:
            return {
                ...state,
                current_page: state.current_page - 1
            };
    }
};

const PaginationPage = ({ count, current, changePage }) => {
    const [store, dispatch] = useReducer(pageReducer, initialState);

    useEffect(() => {
        dispatch({ type: RESET_PAGE_LENGTH });

        for (let i = 1; i <= count; i++) {
            dispatch({ type: ADD_PAGE_LENGTH, payload: i });
        }

        dispatch({ type: SET_CURRENT_PAGE, payload: parseInt(current) });
    }, [count, current]);

    return (
        <MDBRow className="w-100">
            <MDBCol>
                <MDBPagination className="justify-content-center" circle>
                    <MDBPageItem
                        onClick={() => {
                            changePage(store.current_page - 1);
                            dispatch({ type: PREV_PAGE });
                        }}
                        disabled={store.current_page === 1 ? true : false}
                    >
                        <MDBPageNav className="page-link">
                            <span>Prev</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    {store.pages &&
                        store.pages.map(page => (
                            <MDBPageItem
                                active={
                                    page == store.current_page ? true : false
                                }
                                onClick={() => {
                                    changePage(page);
                                    dispatch({
                                        type: SET_CURRENT_PAGE,
                                        payload: page
                                    });
                                }}
                                key={page}
                            >
                                <MDBPageNav className="page-link">
                                    {page}
                                </MDBPageNav>
                            </MDBPageItem>
                        ))}
                    <MDBPageItem
                        disabled={store.current_page === count ? true : false}
                        onClick={() => {
                            changePage(store.current_page + 1);
                            dispatch({ type: NEXT_PAGE });
                        }}
                    >
                        <MDBPageNav className="page-link">Next</MDBPageNav>
                    </MDBPageItem>
                </MDBPagination>
            </MDBCol>
        </MDBRow>
    );
};

export default PaginationPage;
