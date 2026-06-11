import React from 'react';
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

// 1. バリデーションルールの定義
const schema = z.object({
  user_name: z.string().min(2, "名前は2文字以上で入力してください"),
  user_email: z.string().email("正しいメールアドレス形式で入力してください"),
  message: z.string().min(10, "メッセージは10文字以上で入力してください"),
});

export const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("メッセージを送信しました！");
      reset(); // フォームをクリア
    } catch (error) {
      toast.error("送信に失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <section id="CONTACT" className="py-24 px-6 md:px-12 bg-slate-900/30">
      <Toaster position="bottom-right" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-wider">
          CONTACT <span className="text-emerald-400">ME</span>
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">NAME</label>
            <input {...register("user_name")} className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors" />
            {errors.user_name && <p className="text-red-400 text-xs mt-1">{errors.user_name.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">EMAIL</label>
            <input {...register("user_email")} className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors" />
            {errors.user_email && <p className="text-red-400 text-xs mt-1">{errors.user_email.message}</p>}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">MESSAGE</label>
            <textarea {...register("message")} rows="4" className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-linear-to-r from-cyan-600 to-emerald-600 text-white font-bold tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};