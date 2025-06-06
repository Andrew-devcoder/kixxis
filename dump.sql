--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Homebrew)
-- Dumped by pg_dump version 15.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cocktail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cocktail" (
    id text NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text
);


ALTER TABLE public."Cocktail" OWNER TO postgres;

--
-- Name: TestItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TestItem" (
    id integer NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TestItem" OWNER TO postgres;

--
-- Name: TestItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TestItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TestItem_id_seq" OWNER TO postgres;

--
-- Name: TestItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TestItem_id_seq" OWNED BY public."TestItem".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: TestItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestItem" ALTER COLUMN id SET DEFAULT nextval('public."TestItem_id_seq"'::regclass);


--
-- Data for Name: Cocktail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cocktail" (id, name, price, "createdAt", description) FROM stdin;
04652761-406d-421a-95b9-d54713f06b6f	new	123	2025-05-11 19:42:22.411	des
b0785471-95e5-42d2-9da9-4bc8ef5f33b8	new cock	2313	2025-05-11 20:08:33.358	\N
\.


--
-- Data for Name: TestItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TestItem" (id, title, "createdAt") FROM stdin;
1	Hello from Prisma	2025-05-11 16:52:43.817
2	Hello from Prisma	2025-05-11 16:53:04.957
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password) FROM stdin;
272c893d-21a4-44e2-b379-bc547459e557	Admin	admin@kixxis.com	$2b$10$ldzHDX4QQR2ob1fLSup0S.hBlcCZnuicbzG0KyyWxPjJaB870goe2
\.


--
-- Name: TestItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TestItem_id_seq"', 2, true);


--
-- Name: Cocktail Cocktail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cocktail"
    ADD CONSTRAINT "Cocktail_pkey" PRIMARY KEY (id);


--
-- Name: TestItem TestItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TestItem"
    ADD CONSTRAINT "TestItem_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- PostgreSQL database dump complete
--

