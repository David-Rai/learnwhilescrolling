-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.questions (
  hint text DEFAULT ''::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  q text,
  a text,
  options json,
  category text,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  uploaded_by text DEFAULT 'admin'::text,
  lesson text,
  CONSTRAINT questions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.likes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT auth.uid(),
  q_id bigint,
  CONSTRAINT likes_pkey PRIMARY KEY (id),
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT likes_q_id_fkey FOREIGN KEY (q_id) REFERENCES public.questions(id)
);
CREATE TABLE public.board (
  role text DEFAULT 'user'::text,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  point bigint DEFAULT '10'::bigint,
  avatar text,
  username text,
  CONSTRAINT board_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_answer (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  q_id bigint,
  answer text,
  isRight boolean,
  CONSTRAINT user_answer_pkey PRIMARY KEY (id)
);
CREATE TABLE public.category (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  image text,
  totalQuestion bigint DEFAULT '0'::bigint,
  name text,
  CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.class (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  type text DEFAULT 'b'::text,
  name text,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT class_pkey PRIMARY KEY (id)
);
CREATE TABLE public.class_category (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  class_id bigint,
  category_id bigint,
  CONSTRAINT class_category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reports (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text,
  description text,
  user_id text,
  username text,
  CONSTRAINT reports_pkey PRIMARY KEY (id)
);
CREATE TABLE public.feedbacks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title text,
  description text,
  username text,
  user_id text,
  CONSTRAINT feedbacks_pkey PRIMARY KEY (id)
);
CREATE TABLE public.streaks (
  user_id uuid,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  streak_count numeric,
  last_active_date date,
  CONSTRAINT streaks_pkey PRIMARY KEY (id)
);
